import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebaseClient';

export function AdminView() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'usuarios', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let hasAdminAccess = false;
          let failureReason = "Tu cuenta no tiene permisos de administrador.";

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            console.log("Datos encontrados en Firestore:", data);
            if (data.tipo_usuario === 'administrador') {
              hasAdminAccess = true;
            } else {
              failureReason = `El documento existe, pero el campo tipo_usuario tiene el valor: "${data.tipo_usuario || 'indefinido'}" (se esperaba "administrador").`;
            }
          } else {
            failureReason = `No existe un documento en la colección "users" con el ID exacto: ${currentUser.uid}`;
          }

          if (hasAdminAccess) {
            setUser(currentUser);
            setIsAdmin(true);
          } else {
            // Si no tiene acceso, destruimos la sesión inmediatamente y redirigimos
            await signOut(auth);
            setUser(null);
            setIsAdmin(false);
            window.location.replace('/');
          }
        } catch (err) {
          console.error("Error al verificar tipo_usuario", err);
          await signOut(auth);
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

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Es mejor práctica borrar las credenciales inmediatamente tras iniciar sesión
      setEmail('');
      setPassword('');
    } catch (err) {
      // Si falla el inicio de sesión (credenciales incorrectas), redirigimos
      window.location.replace('/');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.replace('/');
  };

  // Temporizador de inactividad de 15 minutos (900000 ms)
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Al cumplirse el tiempo, forzamos cierre de sesión y volvemos al inicio
        handleLogout();
        window.location.replace('/');
      }, 900000);
    };

    if (isAdmin) {
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
    }
  }, [isAdmin]);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Cargando validación de usuario...</div>;
  }

  // Si no hay un usuario válido con rol de admin, siempre mostramos el login
  if (!user || !isAdmin) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Login de Administrador</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block' }}>Correo: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block' }}>Contraseña: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

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
