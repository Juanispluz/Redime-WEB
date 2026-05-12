export function PublicacionForm({
  titulo, onTituloChange,
  subtitulo, onSubtituloChange,
  descripcion, onDescripcionChange,
  imagenPreview,
  editingId,
  submitting,
  error,
  onSubmit,
  onImageChange,
  onCancel,
}) {
  return (
    <div style={{ maxWidth: '600px', marginBottom: '2rem' }}>
      <h3>{editingId ? 'Editar Publicación' : 'Nueva Publicación'}</h3>
      <form onSubmit={onSubmit} autoComplete="off">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => onTituloChange(e.target.value)}
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
            onChange={(e) => onSubtituloChange(e.target.value)}
            autoComplete="off"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block' }}>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => onDescripcionChange(e.target.value)}
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
            onChange={onImageChange}
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
          <button type="button" onClick={onCancel} style={{ marginRight: '0.5rem' }}>
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
  );
}
