import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = [
  process.env.FRONTEND_URL,
  `http://localhost:${PORT}`,
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:5500',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (isProduction) {
  app.use('/imgs-db', express.static(path.join(__dirname, 'imgs-db'), {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.webp')) res.set('Content-Type', 'image/webp');
      else if (filePath.endsWith('.png')) res.set('Content-Type', 'image/png');
      else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) res.set('Content-Type', 'image/jpeg');
    },
  }));
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen.' });
    }

    const targetPath = req.body.path;
    if (!targetPath) {
      return res.status(400).json({ error: 'No se especificó la ruta (path) de destino.' });
    }

    const safePath = path.normalize(targetPath).replace(/^(\.\.[\/\\])+/, '');
    const absoluteTargetDir = path.resolve(__dirname, safePath);

    if (!fs.existsSync(absoluteTargetDir)) {
      fs.mkdirSync(absoluteTargetDir, { recursive: true });
    }

    const absoluteFilePath = path.join(absoluteTargetDir, req.file.originalname);

    fs.writeFileSync(absoluteFilePath, req.file.buffer);

    console.log(`[Upload] Archivo guardado con éxito en: ${absoluteFilePath}`);

    const virtualUrl = `/${safePath}/${req.file.originalname}`.replace(/\\/g, '/');

    res.status(200).json({ url: virtualUrl, success: true });
  } catch (error) {
    console.error('[Upload] Error subiendo el archivo:', error);
    res.status(500).json({ error: 'Error interno al guardar la imagen.' });
  }
});

if (isProduction) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  if (err.message && err.message.startsWith('Origen no permitido por CORS')) {
    console.warn(`[CORS] Bloqueado: ${req.headers.origin}`);
    return res.status(403).json({ error: 'Origen no permitido' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Servidor ${isProduction ? 'PRODUCCIÓN' : 'DESARROLLO'} corriendo en puerto ${PORT}`);
});
