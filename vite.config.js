import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin personalizado para servir de manera segura la carpeta imgs-db
function serveImgsDbPlugin() {
  return {
    name: 'serve-imgs-db',
    configureServer(server) {
      server.middlewares.use('/imgs-db', (req, res, next) => {
        // Limpiar URL de posibles parámetros GET
        const cleanUrl = req.url.split('?')[0];
        
        // Evitar ataques de Directory Traversal (ej. ../../etc/passwd)
        const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
        const targetPath = path.resolve(process.cwd(), 'imgs-db', safePath.replace(/^\//, ''));

        // Doble verificación: El archivo DEBE resolverse dentro de la carpeta imgs-db
        const baseDbPath = path.resolve(process.cwd(), 'imgs-db');
        if (!targetPath.startsWith(baseDbPath)) {
          res.statusCode = 403;
          return res.end('Forbidden');
        }

        if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
          // Asignar el MIME type correcto
          if (targetPath.endsWith('.webp')) res.setHeader('Content-Type', 'image/webp');
          else if (targetPath.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
          else if (targetPath.endsWith('.jpg') || targetPath.endsWith('.jpeg')) res.setHeader('Content-Type', 'image/jpeg');
          
          res.statusCode = 200;
          fs.createReadStream(targetPath).pipe(res);
        } else {
          next(); // Archivo no encontrado, pasamos al siguiente middleware
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveImgsDbPlugin()],
})
