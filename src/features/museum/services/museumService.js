import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseClient';

export const museumService = {
  /**
   * Obtiene los últimos 10 dispositivos públicos para una categoría específica.
   * Filtra y ordena en memoria para evitar la necesidad de crear un Composite Index
   * manualmente en Firestore durante esta etapa inicial.
   * 
   * @param {string} category - El tipo de dispositivo (ej. 'telecommunications')
   * @returns {Promise<Array>} Lista de dispositivos formateados para la vista.
   */
  getPublicDevices: async (category) => {
    try {
      const dispositivosRef = collection(db, 'dispositivos');

      // Consultamos por categoría (esto solo requiere un Single Field Index automático)
      const q = query(
        dispositivosRef,
        where('tipo_dispositivo', '==', category)
      );

      const querySnapshot = await getDocs(q);
      let rawDevices = [];

      // Filtrar los que tengan historia pública
      querySnapshot.forEach((document) => {
        const data = document.data();
        if (data.historia?.publica === true) {
          rawDevices.push({
            id: document.id,
            ...data
          });
        }
      });

      // Ordenar por fecha_registro descendente
      rawDevices.sort((a, b) => {
        // Manejar Timestamps de Firestore
        const timeA = a.fecha_registro?.toMillis ? a.fecha_registro.toMillis() : 0;
        const timeB = b.fecha_registro?.toMillis ? b.fecha_registro.toMillis() : 0;
        return timeB - timeA;
      });

      // Limitar a máximo 10 historias
      rawDevices = rawDevices.slice(0, 10);

      const devices = [];

      // Obtener la información del Dueño para cada dispositivo
      for (const data of rawDevices) {
        let ownerName = 'Dueño Anónimo';

        if (data.id_usuario) {
          try {
            // id_usuario puede ser un path (usuarios/123) o directamente una referencia
            let userDocRef;
            if (typeof data.id_usuario === 'string') {
              userDocRef = doc(db, data.id_usuario);
            } else {
              userDocRef = data.id_usuario;
            }

            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              ownerName = `${userData.nombre} ${userData.apellido}`;
            }
          } catch (err) {
            console.warn(`No se pudo obtener el usuario para el dispositivo ${data.id}`, err);
          }
        }

        // La foto se busca en la ruta local usando el ID del usuario y el ID del dispositivo
        const userIdSegment = typeof data.id_usuario === 'string'
          ? data.id_usuario.split('/').pop()
          : data.id_usuario?.id || 'default';

        // Asumimos formato .png (ej: public/imgs-db/usuarios/test_user_123/disp_test_001.webp)
        const finalImgUrl = `/imgs-db/usuarios/${userIdSegment}/${data.id}.webp`;

        devices.push({
          id: data.id,
          title: `${data.marca} ${data.modelo}`,
          owner: ownerName,
          text: data.historia?.texto_historia || '',
          img: finalImgUrl
        });
      }

      return devices;
    } catch (error) {
      console.error('[museumService] Error obteniendo dispositivos:', error);
      return [];
    }
  }
};
