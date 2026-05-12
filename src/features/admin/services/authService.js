import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebaseClient';

export function onAuthChange(onUser) {
  return onAuthStateChanged(auth, onUser);
}

export async function verificarAdmin(userId) {
  const userDocRef = doc(db, 'usuarios', userId);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data().tipo_usuario === 'administrador';
  }
  return false;
}

export async function iniciarSesion(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function cerrarSesion() {
  await signOut(auth);
}
