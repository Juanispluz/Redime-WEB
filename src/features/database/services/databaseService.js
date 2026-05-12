import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../../services/firebaseClient.js';

/**
 * Verifica la conexión a Firestore intentando leer un documento.
 * No requiere que exista ninguna colección específica — si Firestore responde,
 * la conexión está activa.
 *
 * @returns {Promise<'Conectado' | 'Error'>} Estado de la conexión como string.
 */
const checkDatabaseConnection = async () => {
  try {
    const testQuery = query(collection(db, '_connection_test'), limit(1));
    await getDocs(testQuery);
    return 'Conectado';
  } catch (error) {
    console.error('[databaseService] Error al conectar con Firestore:', error);
    return 'Error';
  }
};

export { checkDatabaseConnection };
