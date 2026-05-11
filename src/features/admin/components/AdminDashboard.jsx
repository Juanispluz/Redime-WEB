import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../services/firebaseClient';

export function AdminDashboard({ user }) {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.replace('/');
  };

  // Temporizador de inactividad configurable por variable de entorno (por defecto 15 mins)
  useEffect(() => {
    let timeoutId;
    const TIMEOUT_MS = parseInt(import.meta.env.VITE_ADMIN_TIMEOUT_MS, 10) || 900000;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Al cumplirse el tiempo, forzamos cierre de sesión y volvemos al inicio
        handleLogout();
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
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administrador</h2>
      <p>Bienvenido, administrador {user.email}</p>
      <button onClick={handleLogout} style={{ marginBottom: '2rem' }}>Cerrar Sesión</button>

      <div>
        <p>Contenido del panel de administrador en construcción...</p>
      </div>
    </div>
  );
}
