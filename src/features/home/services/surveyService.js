import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../services/firebaseClient';

/**
 * Guarda los resultados de la encuesta en la colección "survey_results" de Firestore.
 * @param {Object} payload - { name, device, answers, archetype, score }
 * @returns {Promise<string>} - ID del documento creado
 */
export async function saveSurveyResult(payload) {
  const docRef = await addDoc(collection(db, 'survey_results'), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
