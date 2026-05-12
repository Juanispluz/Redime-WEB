import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { inicializarGPG } from './backend/src/config/gpg.js';
import { descifrarRequest, cifrarResponse } from './backend/src/middleware/gpgMiddleware.js';
import crearRouterUpload from './backend/src/features/upload/routes/uploadRoutes.js';

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

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' https://*.firebaseio.com https://*.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com; font-src 'self'; frame-src 'self' https://*.firebaseapp.com");
  next();
});

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

if (isProduction) {
  app.use('/imgs-db', express.static(path.join(__dirname, 'imgs-db'), {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.webp')) res.set('Content-Type', 'image/webp');
      else if (filePath.endsWith('.png')) res.set('Content-Type', 'image/png');
      else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) res.set('Content-Type', 'image/jpeg');
    },
  }));
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(descifrarRequest);
app.use(cifrarResponse);

app.use(crearRouterUpload());

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

async function iniciar() {
  try {
    await inicializarGPG();
    console.log('[GPG] Sistema de cifrado listo');
  } catch (err) {
    console.warn('[GPG] No se pudo inicializar GPG:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Servidor ${isProduction ? 'PRODUCCIÓN' : 'DESARROLLO'} corriendo en puerto ${PORT}`);
  });
}

iniciar();
