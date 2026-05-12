export function AdminDashboard({
  userEmail,
  onLogout,
  children,
}) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administrador</h2>
      <p>Bienvenido, administrador {userEmail}</p>
      <button onClick={onLogout} style={{ marginBottom: '2rem' }}>Cerrar Sesión</button>
      <div>{children}</div>
    </div>
  );
}
