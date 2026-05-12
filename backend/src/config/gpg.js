import * as openpgp from 'openpgp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYS_DIR = path.resolve(__dirname, '..', '..', '..', '..', 'keys');
const PUBLIC_KEY_PATH = path.join(KEYS_DIR, 'public.key');
const PRIVATE_KEY_PATH = path.join(KEYS_DIR, 'private.key');
const PASSPHRASE = process.env.GPG_PASSPHRASE || 'redime-gpg-pass-2026';

let publicKey = null;
let privateKeyObj = null;

export async function inicializarGPG() {
  if (publicKey && privateKeyObj) return { publicKey, privateKeyObj };

  if (fs.existsSync(PUBLIC_KEY_PATH) && fs.existsSync(PRIVATE_KEY_PATH)) {
    publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf-8');
    const armoredPriv = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8');
    const privKey = await openpgp.readPrivateKey({ armoredKey: armoredPriv });
    privateKeyObj = await openpgp.decryptKey({ privateKey: privKey, passphrase: PASSPHRASE });
    console.log('[GPG] Keys cargadas desde archivos');
  } else {
    console.log('[GPG] Generando par de llaves GPG...');
    const { privateKey: priv, publicKey: pub } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 2048,
      userIDs: [{ name: 'Redime API', email: 'api@redime.app' }],
      passphrase: PASSPHRASE,
    });
    publicKey = pub;
    const privKey = await openpgp.readPrivateKey({ armoredKey: priv });
    privateKeyObj = await openpgp.decryptKey({ privateKey: privKey, passphrase: PASSPHRASE });

    if (!fs.existsSync(KEYS_DIR)) fs.mkdirSync(KEYS_DIR, { recursive: true });
    fs.writeFileSync(PUBLIC_KEY_PATH, publicKey);
    fs.writeFileSync(PRIVATE_KEY_PATH, priv);
    console.log('[GPG] Keys generadas y guardadas en keys/');
  }

  return { publicKey, privateKeyObj };
}

export function obtenerLlavePublica() {
  return publicKey;
}

export async function descifrar(mensajeArmado) {
  if (!privateKeyObj) throw new Error('GPG no inicializado');
  const message = await openpgp.readMessage({ armoredMessage: mensajeArmado });
  const { data } = await openpgp.decrypt({ message, decryptionKeys: privateKeyObj });
  return JSON.parse(data);
}

export async function cifrar(data) {
  if (!publicKey) throw new Error('GPG no inicializado');
  const message = await openpgp.createMessage({ text: JSON.stringify(data) });
  const pubKey = await openpgp.readKey({ armoredKey: publicKey });
  const encrypted = await openpgp.encrypt({ message, encryptionKeys: pubKey });
  return encrypted;
}
