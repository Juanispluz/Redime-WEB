import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../services/firebaseClient';

export function PublicacionForm({ user }) {
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'publicaciones'), orderBy('fecha', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pubs = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })).filter((p) => p.estado === true);
      setPublicaciones(pubs);
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setTitulo('');
    setSubtitulo('');
    setDescripcion('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!titulo || !subtitulo || !descripcion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'publicaciones', editingId), {
          titulo,
          subtitulo,
          descripcion,
          fecha: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'publicaciones'), {
          id_usuario: doc(db, 'usuarios', user.uid),
          titulo,
          subtitulo,
          descripcion,
          fecha: serverTimestamp(),
          estado: true,
        });
      }

      resetForm();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al guardar la publicación: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (pub) => {
    setTitulo(pub.titulo || '');
    setSubtitulo(pub.subtitulo || '');
    setDescripcion(pub.descripcion || '');
    setEditingId(pub.id);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Desactivar esta publicación?')) return;
    try {
      await updateDoc(doc(db, 'publicaciones', id), { estado: false });
    } catch (err) {
      console.error('Error al desactivar:', err);
    }
  };

  const formatFecha = (f) => {
    if (!f) return '';
    const d = f.toDate ? f.toDate() : new Date(f);
    return d.toLocaleString('es-CO', { timeZone: 'UTC' });
  };

  return (
    <div>
      <div style={{ maxWidth: '600px', marginBottom: '2rem' }}>
        <h3>{editingId ? 'Editar Publicación' : 'Nueva Publicación'}</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block' }}>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              autoComplete="off"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block' }}>Subtítulo:</label>
            <input
              type="text"
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
              autoComplete="off"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block' }}>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              autoComplete="off"
              required
              rows={4}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          {editingId && (
            <button type="button" onClick={resetForm} style={{ marginRight: '0.5rem' }}>
              Cancelar
            </button>
          )}

          {error && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Enviando...' : editingId ? 'Actualizar' : 'Crear Publicación'}
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '900px' }}>
        <h3>Publicaciones Creadas</h3>
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Título</th>
                <th style={{ padding: '0.5rem' }}>Subtítulo</th>
                <th style={{ padding: '0.5rem' }}>Fecha</th>
                <th style={{ padding: '0.5rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {publicaciones.map((pub) => (
                <tr key={pub.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{pub.titulo}</td>
                  <td style={{ padding: '0.5rem' }}>{pub.subtitulo}</td>
                  <td style={{ padding: '0.5rem' }}>{formatFecha(pub.fecha)}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <button onClick={() => handleEdit(pub)} style={{ marginRight: '0.5rem' }}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(pub.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {success && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            padding: '2rem',
            textAlign: 'center',
            fontSize: '1.2rem',
          }}>
            Se envió correctamente a la base de datos
          </div>
        </div>
      )}
    </div>
  );
}
