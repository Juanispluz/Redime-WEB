import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..');

export async function guardarImagenBuffer(buffer, nombreOriginal, rutaRelativa) {
  const safePath = path.normalize(rutaRelativa).replace(/^(\.\.[\/\\])+/, '');
  const absoluteTargetDir = path.resolve(PROJECT_ROOT, safePath);

  if (!absoluteTargetDir.startsWith(path.resolve(PROJECT_ROOT, 'imgs-db'))) {
    throw new Error('Ruta no permitida');
  }

  if (!fs.existsSync(absoluteTargetDir)) {
    fs.mkdirSync(absoluteTargetDir, { recursive: true });
  }

  const absoluteFilePath = path.join(absoluteTargetDir, nombreOriginal);
  fs.writeFileSync(absoluteFilePath, buffer);

  const virtualUrl = `/${safePath}/${nombreOriginal}`.replace(/\\/g, '/');
  console.log(`[Upload] Guardado: ${absoluteFilePath}`);

  return { url: virtualUrl, absolutePath: absoluteFilePath };
}
