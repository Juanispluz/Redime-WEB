import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseClient';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login de Administrador</h2>
      <form onSubmit={handleLogin} autoComplete="off">
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
