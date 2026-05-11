import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseClient';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setIntentos(0);
    } catch (err) {
      const nuevosIntentos = intentos + 1;
      if (nuevosIntentos >= 5) {
        window.location.replace('/');
      } else {
        setIntentos(nuevosIntentos);
        setErrorMsg(`Credenciales incorrectas. Te quedan ${5 - nuevosIntentos} intento(s).`);
      }
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

        {errorMsg && (
          <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>
            {errorMsg}
          </div>
        )}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
