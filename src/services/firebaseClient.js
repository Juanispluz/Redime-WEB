import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Configuración del Firebase Client SDK.
 * Los valores se leen desde variables de entorno (prefijo VITE_ requerido por Vite).
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/** Instancia principal de la aplicación Firebase. */
const firebaseApp = initializeApp(firebaseConfig);

/** Instancia de Firestore lista para consultas. */
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
