import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function serveImgsDbPlugin() {
  return {
    name: 'serve-imgs-db',
    configureServer(server) {
      server.middlewares.use('/imgs-db', (req, res, next) => {
        const cleanUrl = req.url.split('?')[0];
        const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
        const targetPath = path.resolve(process.cwd(), 'imgs-db', safePath.replace(/^\//, ''));

        const baseDbPath = path.resolve(process.cwd(), 'imgs-db');
        if (!targetPath.startsWith(baseDbPath)) {
          res.statusCode = 403;
          return res.end('Forbidden');
        }

        if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
          if (targetPath.endsWith('.webp')) res.setHeader('Content-Type', 'image/webp');
          else if (targetPath.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
          else if (targetPath.endsWith('.jpg') || targetPath.endsWith('.jpeg')) res.setHeader('Content-Type', 'image/jpeg');

          res.statusCode = 200;
          fs.createReadStream(targetPath).pipe(res);
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveImgsDbPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
