import { useAdminViewModel } from '../viewmodels/useAdminViewModel';
import { AdminLogin } from '../components/AdminLogin';
import { AdminDashboard } from '../components/AdminDashboard';
import { PublicacionForm } from '../components/PublicacionForm';
import { PublicacionesTable } from '../components/PublicacionesTable';

export function AdminView() {
  const vm = useAdminViewModel();

  if (vm.loading) {
    return <div style={{ padding: '2rem' }}>Cargando validación de usuario...</div>;
  }

  if (!vm.user || !vm.isAdmin) {
    return (
      <AdminLogin
        email={vm.loginEmail}
        onEmailChange={vm.setLoginEmail}
        password={vm.loginPassword}
        onPasswordChange={vm.setLoginPassword}
        errorMsg={vm.loginError}
        onSubmit={vm.handleLogin}
      />
    );
  }

  return (
    <AdminDashboard userEmail={vm.user.email} onLogout={vm.handleLogout}>
      <PublicacionForm
        titulo={vm.titulo}
        onTituloChange={vm.setTitulo}
        subtitulo={vm.subtitulo}
        onSubtituloChange={vm.setSubtitulo}
        descripcion={vm.descripcion}
        onDescripcionChange={vm.setDescripcion}
        imagenPreview={vm.imagenPreview}
        editingId={vm.editingId}
        submitting={vm.submitting}
        error={vm.error}
        onSubmit={vm.handleSubmit}
        onImageChange={vm.handleImageChange}
        onCancel={vm.resetForm}
      />
      <PublicacionesTable
        publicaciones={vm.publicaciones}
        onEdit={vm.handleEdit}
        onDelete={vm.handleDelete}
        onImageUrl={vm.handleImageUrl}
        onFormatFecha={vm.formatFecha}
      />
    </AdminDashboard>
  );
}
