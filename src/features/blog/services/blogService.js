import { collection, query, orderBy, limit, startAfter, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseClient';

export const blogService = {
  getPublicaciones: async (lastVisibleDoc = null) => {
    try {
      // Se elimina el where('estado', '==', true) para evitar el error de índice compuesto en Firebase.
      let q = query(
        collection(db, 'publicaciones'),
        orderBy('fecha', 'desc'),
        limit(10) // Traemos un poco más para filtrar localmente sin quedarnos sin datos
      );

      if (lastVisibleDoc) {
        q = query(
          collection(db, 'publicaciones'),
          orderBy('fecha', 'desc'),
          startAfter(lastVisibleDoc),
          limit(10)
        );
      }

      const querySnapshot = await getDocs(q);
      let docs = querySnapshot.docs;
      
      // Filtrar localmente los que están activos (estado === true)
      docs = docs.filter(docSnap => docSnap.data().estado === true);
      
      // Tomamos solo 4 para la página actual
      const pageDocs = docs.slice(0, 4);
      const lastDoc = pageDocs.length > 0 ? pageDocs[pageDocs.length - 1] : null;

      const publicaciones = pageDocs.map((docSnap) => {
        const data = docSnap.data();
        
        let dateStr = '';
        if (data.fecha) {
          const d = data.fecha.toDate ? data.fecha.toDate() : new Date(data.fecha);
          const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
          dateStr = d.toLocaleDateString('es-CO', opciones).replace('.', '');
        }

        let imageUrl = data.imagenUrl || '';
        if (!imageUrl && data.fecha) {
          const d = data.fecha.toDate ? data.fecha.toDate() : new Date(data.fecha);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          imageUrl = `/imgs-db/publicaciones/${day}-${month}-${year}/${docSnap.id}.webp`;
        } else if (!imageUrl) {
          imageUrl = '/no_image.png';
        }

        return {
          id: docSnap.id,
          title: data.titulo || 'Sin título',
          desc: data.descripcion || '',
          date: dateStr,
          img: imageUrl
        };
      });

      return {
        data: publicaciones,
        lastDoc,
        // Si hay más documentos activos de los 4 que mostramos, sabemos seguro que hay más.
        // Si no, podríamos verificar si querySnapshot.docs.length era igual al límite (10).
        hasMore: docs.length > 4 || querySnapshot.docs.length === 10
      };
    } catch (error) {
      console.error('[blogService] Error obteniendo publicaciones:', error);
      throw error;
    }
  },

  getPublicacionById: async (id) => {
    try {
      const docRef = doc(db, 'publicaciones', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;

      const data = docSnap.data();
      
      let dateStr = '';
      if (data.fecha) {
        const d = data.fecha.toDate ? data.fecha.toDate() : new Date(data.fecha);
        const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
        dateStr = d.toLocaleDateString('es-CO', opciones).replace('.', '');
      }

      let imageUrl = data.imagenUrl || '';
      if (!imageUrl && data.fecha) {
        const d = data.fecha.toDate ? data.fecha.toDate() : new Date(data.fecha);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        imageUrl = `/imgs-db/publicaciones/${day}-${month}-${year}/${docSnap.id}.webp`;
      } else if (!imageUrl) {
        imageUrl = '/no_image.png';
      }

      return {
        id: docSnap.id,
        title: data.titulo || 'Sin título',
        contentHeading: data.subtitulo || '',
        contentParagraphs: data.descripcion ? data.descripcion.split('\n') : [],
        date: dateStr,
        img: imageUrl
      };
    } catch (error) {
      console.error('[blogService] Error obteniendo publicación por ID:', error);
      throw error;
    }
  }
};
