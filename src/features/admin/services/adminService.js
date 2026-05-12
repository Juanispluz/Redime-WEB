import {
  collection, doc, setDoc, updateDoc, serverTimestamp,
  onSnapshot, orderBy, query
} from 'firebase/firestore';
import { db } from '../../../services/firebaseClient';
import * as http from '../../../services/httpClient.js';

function getFolderPath() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `imgs-db/publicaciones/${day}-${month}-${year}`;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function subirImagen(imagenBlob, pubId, idToken) {
  if (!imagenBlob) return null;

  const folderPath = getFolderPath();
  const filename = `${pubId}.webp`;
  const image = await blobToBase64(imagenBlob);

  const headers = {};
  if (idToken) headers['Authorization'] = `Bearer ${idToken}`;

  const data = await http.post('/api/upload', { image, filename, path: folderPath }, { headers });
  return data.url;
}

export function suscribirPublicaciones(onCambio) {
  const q = query(collection(db, 'publicaciones'), orderBy('fecha', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const pubs = snapshot.docs
      .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
      .filter((p) => p.estado === true);
    onCambio(pubs);
  });
}

export function generarReferencia() {
  return doc(collection(db, 'publicaciones'));
}

export async function crearPublicacion(pubRef, { titulo, subtitulo, descripcion, imagenUrl, userId }) {
  await setDoc(pubRef, {
    id_usuario: doc(db, 'usuarios', userId),
    titulo,
    subtitulo,
    descripcion,
    imagenUrl,
    fecha: serverTimestamp(),
    estado: true,
  });
}

export async function actualizarPublicacion(id, { titulo, subtitulo, descripcion, imagenUrl }) {
  await updateDoc(doc(db, 'publicaciones', id), {
    titulo,
    subtitulo,
    descripcion,
    ...(imagenUrl && { imagenUrl }),
  });
}

export async function desactivarPublicacion(id) {
  await updateDoc(doc(db, 'publicaciones', id), { estado: false });
}
