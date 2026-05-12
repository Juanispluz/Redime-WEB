import { guardarImagenBuffer } from '../services/uploadService.js';
import { obtenerLlavePublica as getPubKey } from '../../../config/gpg.js';

function base64ParaBuffer(base64) {
  const raw = base64.split(';base64,').pop();
  return Buffer.from(raw, 'base64');
}

export async function manejarUpload(req, res) {
  try {
    const { image, filename, path: targetPath } = req.body;

    if (targetPath && !targetPath.startsWith('imgs-db/')) {
      return res.status(400).json({ error: 'Ruta de destino inválida' });
    }

    if (!image || !filename || !targetPath) {
      return res.status(400).json({ error: 'Faltan campos requeridos: image, filename, path' });
    }

    const buffer = base64ParaBuffer(image);
    const resultado = await guardarImagenBuffer(buffer, filename, targetPath);
    res.status(200).json({ url: resultado.url, success: true });
  } catch (error) {
    console.error('[Upload] Error:', error);
    res.status(500).json({ error: 'Error interno al guardar la imagen.' });
  }
}

export async function obtenerLlavePublicaCtrl(req, res) {
  const pubKey = getPubKey();
  if (!pubKey) {
    return res.status(500).json({ error: 'GPG no inicializado' });
  }
  res.json({ publicKey: pubKey });
}
