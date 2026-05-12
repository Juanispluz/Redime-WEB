import { descifrar, cifrar } from '../config/gpg.js';

let frontendPublicKeys = new Map();

export async function descifrarRequest(req, res, next) {
  if (req.method === 'OPTIONS') return next();
  if (req.path === '/api/public-key') return next();

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const encryptedPayload = req.body?.encrypted;
      if (!encryptedPayload) {
        return res.status(400).json({ error: 'Cuerpo cifrado requerido' });
      }
      const datos = await descifrar(encryptedPayload);
      if (datos.frontendPublicKey) {
        frontendPublicKeys.set(datos.frontendPublicKey.slice(-50), datos.frontendPublicKey);
      }
      req.body = datos;
    } catch (err) {
      console.error('[GPG] Error descifrando request:', err.message);
      return res.status(400).json({ error: 'Error al descifrar la solicitud' });
    }
  }
  next();
}

export async function cifrarResponse(req, res, next) {
  const originalJson = res.json.bind(res);

  res.json = async function (body) {
    if (req.path === '/api/public-key' || res.statusCode >= 400) {
      return originalJson(body);
    }

    const frontendKey = req.body?.frontendPublicKey;
    if (!frontendKey) return originalJson(body);

    try {
      const pubKey = await (await import('openpgp')).readKey({ armoredKey: frontendKey });
      const message = await (await import('openpgp')).createMessage({ text: JSON.stringify(body) });
      const encrypted = await (await import('openpgp')).encrypt({ message, encryptionKeys: pubKey });
      return originalJson({ encrypted });
    } catch (err) {
      console.error('[GPG] Error cifrando respuesta:', err.message);
      return originalJson(body);
    }
  };

  next();
}
