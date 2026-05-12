export function AdminLogin({
  email, onEmailChange,
  password, onPasswordChange,
  errorMsg,
  onSubmit,
}) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login de Administrador</h2>
      <form onSubmit={onSubmit} autoComplete="off">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>Correo: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>Contraseña: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
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
