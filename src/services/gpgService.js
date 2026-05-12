import * as openpgp from 'openpgp';

let backendPublicKeyObj = null;
let frontendPrivateKeyObj = null;
let frontendPublicKeyArmored = null;
let initialized = false;

export async function inicializarGPG() {
  if (initialized) return true;
  try {
    const res = await fetch('/api/public-key');
    const data = await res.json();
    backendPublicKeyObj = await openpgp.readKey({ armoredKey: data.publicKey });
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'ecc', curve: 'curve25519',
      userIDs: [{ name: 'session', email: 'session@redime.app' }],
    });
    frontendPrivateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
    frontendPublicKeyArmored = publicKey;
    initialized = true;
    return true;
  } catch (err) {
    console.warn('[GPG] No se pudo inicializar:', err.message);
    return false;
  }
}

export async function cifrarRequest(data) {
  if (!initialized) await inicializarGPG();
  if (!backendPublicKeyObj) throw new Error('GPG no disponible');
  const message = await openpgp.createMessage({
    text: JSON.stringify({ ...data, frontendPublicKey: frontendPublicKeyArmored }),
  });
  return { encrypted: await openpgp.encrypt({ message, encryptionKeys: backendPublicKeyObj }) };
}

export async function descifrarResponse(respuesta) {
  if (!initialized) await inicializarGPG();
  if (!frontendPrivateKeyObj || !respuesta?.encrypted) throw new Error('GPG no disponible');
  const message = await openpgp.readMessage({ armoredMessage: respuesta.encrypted });
  const { data } = await openpgp.decrypt({ message, decryptionKeys: frontendPrivateKeyObj });
  return JSON.parse(data);
}
