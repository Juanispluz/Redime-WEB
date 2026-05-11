import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebaseClient';
import { AdminLogin } from '../components/AdminLogin';
import { AdminDashboard } from '../components/AdminDashboard';

export function AdminView() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isReloading = false;
    const handleBeforeUnload = () => { isReloading = true; };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'usuarios', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let hasAdminAccess = false;

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            console.log("Datos encontrados en Firestore:", data);
            if (data.tipo_usuario === 'administrador') {
              hasAdminAccess = true;
            }
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

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubscribe();
      if (!isReloading) {
        signOut(auth);
      }
    };
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Cargando validación de usuario...</div>;
  }

  // Si no hay un usuario válido con rol de admin, siempre mostramos el login
  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  return <AdminDashboard user={user} />;
}
