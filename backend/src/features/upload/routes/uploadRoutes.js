import { Router } from 'express';
import { manejarUpload, obtenerLlavePublicaCtrl } from '../controllers/uploadController.js';
import { verificarToken } from '../../../../../middleware/authMiddleware.js';
import { uploadLimiter } from '../../../../../middleware/rateLimitMiddleware.js';

export default function crearRouterUpload() {
  const router = Router();

  router.get('/api/public-key', obtenerLlavePublicaCtrl);
  router.post('/api/upload', verificarToken, uploadLimiter, manejarUpload);

  return router;
}
