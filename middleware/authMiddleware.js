import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let initialized = false;

function initFirebaseAdmin() {
  if (initialized) return;
  const serviceAccountPath = path.resolve(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS || 'firebase.json');
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    initialized = true;
    console.log('[Auth] Firebase Admin SDK inicializado');
  } else {
    console.warn('[Auth] firebase.json no encontrado, JWT verification deshabilitada');
  }
}

export async function verificarToken(req, res, next) {
  initFirebaseAdmin();

  if (!initialized) {
    return res.status(500).json({ error: 'Firebase Admin no configurado' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autorización requerido' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.warn('[Auth] Token inválido:', err.message);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
