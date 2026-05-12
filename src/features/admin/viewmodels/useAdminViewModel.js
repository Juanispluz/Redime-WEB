import { useState, useEffect, useCallback } from 'react';
import * as adminService from '../services/adminService';
import * as authService from '../services/authService';
import { auth } from '../../../services/firebaseClient';
import { sanitizar } from '../../../utils/sanitize';

export function useAdminViewModel() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginIntentos, setLoginIntentos] = useState(0);

  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenBlob, setImagenBlob] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenUrl, setImagenUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const hasAdminAccess = await authService.verificarAdmin(currentUser.uid);
          if (hasAdminAccess) {
            setUser(currentUser);
            setIsAdmin(true);
          } else {
            await authService.cerrarSesion();
            setUser(null);
            setIsAdmin(false);
            window.location.replace('/');
          }
        } catch {
          await authService.cerrarSesion();
          setUser(null);
          setIsAdmin(false);
          window.location.replace('/');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsub = adminService.suscribirPublicaciones(setPublicaciones);
    return unsub;
  }, []);

  const TIMEOUT_MS = parseInt(import.meta.env.VITE_ADMIN_TIMEOUT_MS, 10) || 900000;

  useEffect(() => {
    if (!user) return;
    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        authService.cerrarSesion();
        window.location.replace('/');
      }, TIMEOUT_MS);
    };
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [user]);

  const resetForm = useCallback(() => {
    setTitulo('');
    setSubtitulo('');
    setDescripcion('');
    setEditingId(null);
    setImagenBlob(null);
    setImagenPreview(null);
    setImagenUrl('');
  }, []);

  const handleImageChange = useCallback((e) => {
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
  }, []);

  const getToken = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No hay sesión activa');
    return currentUser.getIdToken();
  }, []);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await authService.iniciarSesion(loginEmail, loginPassword);
      setLoginEmail('');
      setLoginPassword('');
      setLoginIntentos(0);
    } catch {
      const nuevos = loginIntentos + 1;
      if (nuevos >= 5) {
        window.location.replace('/');
      } else {
        setLoginIntentos(nuevos);
        setLoginError(`Credenciales incorrectas. Te quedan ${5 - nuevos} intento(s).`);
      }
    }
  }, [loginEmail, loginPassword, loginIntentos]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!titulo || !subtitulo || !descripcion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!imagenBlob && !imagenUrl) {
      setError('Debes seleccionar una imagen para la publicación');
      return;
    }

    const tituloLimpio = sanitizar(titulo);
    const subtituloLimpio = sanitizar(subtitulo);
    const descripcionLimpia = sanitizar(descripcion);

    setSubmitting(true);
    try {
      const idToken = await getToken();

      if (editingId) {
        let uploadedUrl = imagenUrl;
        if (imagenBlob) {
          uploadedUrl = await adminService.subirImagen(imagenBlob, editingId, idToken);
        }
        await adminService.actualizarPublicacion(editingId, {
          titulo: tituloLimpio, subtitulo: subtituloLimpio, descripcion: descripcionLimpia, imagenUrl: uploadedUrl,
        });
      } else {
        const pubRef = adminService.generarReferencia();
        const uploadedUrl = await adminService.subirImagen(imagenBlob, pubRef.id, idToken);
        await adminService.crearPublicacion(pubRef, {
          titulo: tituloLimpio, subtitulo: subtituloLimpio, descripcion: descripcionLimpia, imagenUrl: uploadedUrl, userId: user.uid,
        });
      }

      resetForm();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Error al guardar la publicación');
    } finally {
      setSubmitting(false);
    }
  }, [titulo, subtitulo, descripcion, imagenBlob, imagenUrl, editingId, user, resetForm, getToken]);

  const handleEdit = useCallback((pub) => {
    setTitulo(pub.titulo || '');
    setSubtitulo(pub.subtitulo || '');
    setDescripcion(pub.descripcion || '');
    setImagenUrl(pub.imagenUrl || '');
    setImagenPreview(pub.imagenUrl || null);
    setImagenBlob(null);
    setEditingId(pub.id);
    setError('');
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (!confirm('¿Desactivar esta publicación?')) return;
    try {
      await adminService.desactivarPublicacion(id);
    } catch (err) {
      setError('Error al desactivar: ' + err.message);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await authService.cerrarSesion();
    window.location.replace('/');
  }, []);

  const handleImageUrl = useCallback((pub) => {
    if (pub.imagenUrl) return pub.imagenUrl;
    if (!pub.fecha) return '/no_image.png';
    const d = pub.fecha.toDate ? pub.fecha.toDate() : new Date(pub.fecha);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `/imgs-db/publicaciones/${day}-${month}-${year}/${pub.id}.webp`;
  }, []);

  const formatFecha = useCallback((f) => {
    if (!f) return '';
    const d = f.toDate ? f.toDate() : new Date(f);
    return d.toLocaleString('es-CO', { timeZone: 'UTC' });
  }, []);

  return {
    user, isAdmin, loading,
    loginEmail, setLoginEmail,
    loginPassword, setLoginPassword,
    loginError,
    handleLogin,
    titulo, setTitulo,
    subtitulo, setSubtitulo,
    descripcion, setDescripcion,
    imagenBlob, imagenPreview, imagenUrl,
    submitting, error, success,
    publicaciones, editingId,
    handleImageChange, handleSubmit,
    handleEdit, handleDelete, handleLogout,
    handleImageUrl, formatFecha, resetForm,
  };
}
