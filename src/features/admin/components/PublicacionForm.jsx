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
  const [imagenBlob, setImagenBlob] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenUrl, setImagenUrl] = useState('');

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
    setImagenBlob(null);
    setImagenPreview(null);
    setImagenUrl('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          setImagenBlob(blob);
        }, 'image/webp', 0.8);
      };
      img.src = event.target.result;
      setImagenPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToNode = async (pubId) => {
    if (!imagenBlob) return null;

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const folderPath = `imgs-db/publicaciones/${day}-${month}-${year}`;

    const formData = new FormData();
    const filename = `${pubId}.webp`;
    formData.append('image', imagenBlob, filename);
    formData.append('path', folderPath);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Error al subir la imagen');
    }
    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!titulo || !subtitulo || !descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!imagenBlob && !imagenUrl) {
      setError("Debes seleccionar una imagen para la publicacion");
      return;
    }
    setSubmitting(true);
    try {
      const pubRef = editingId ? doc(db, 'publicaciones', editingId) : doc(collection(db, 'publicaciones'));
      const pubId = pubRef.id;

      let uploadedUrl = imagenUrl;

      if (imagenBlob) {
        uploadedUrl = await uploadImageToNode(pubId);
      }

      if (editingId) {
        await updateDoc(pubRef, {
          titulo,
          subtitulo,
          descripcion,
          ...(uploadedUrl && { imagenUrl: uploadedUrl }),
        });
      } else {
        const { setDoc } = await import('firebase/firestore');
        await setDoc(pubRef, {
          id_usuario: doc(db, 'usuarios', user.uid),
          titulo,
          subtitulo,
          descripcion,
          ...(uploadedUrl && { imagenUrl: uploadedUrl }),
          fecha: serverTimestamp(),
          estado: true,
        });
      }

      resetForm();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al guardar la publicación');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (pub) => {
    setTitulo(pub.titulo || '');
    setSubtitulo(pub.subtitulo || '');
    setDescripcion(pub.descripcion || '');
    setImagenUrl(pub.imagenUrl || '');
    setImagenPreview(pub.imagenUrl || null);
    setImagenBlob(null);
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

  const getDynamicImageUrl = (pub) => {
    if (pub.imagenUrl) return pub.imagenUrl;
    if (!pub.fecha) return '/no_image.png';
    const d = pub.fecha.toDate ? pub.fecha.toDate() : new Date(pub.fecha);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `/imgs-db/publicaciones/${day}-${month}-${year}/${pub.id}.webp`;
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

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block' }}>Imagen (se convertirá a WebP):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'block', marginBottom: '0.5rem' }}
            />
            {imagenPreview && (
              <img
                src={imagenPreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
              />
            )}
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
                <th style={{ padding: '0.5rem' }}>Imagen</th>
                <th style={{ padding: '0.5rem' }}>Título</th>
                <th style={{ padding: '0.5rem' }}>Subtítulo</th>
                <th style={{ padding: '0.5rem' }}>Fecha</th>
                <th style={{ padding: '0.5rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {publicaciones.map((pub) => (
                <tr key={pub.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <img
                      src={getDynamicImageUrl(pub)}
                      alt="Pub"
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      onError={(e) => { e.target.src = '/no_image.png'; }}
                    />
                  </td>
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
