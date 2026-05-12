export function PublicacionesTable({
  publicaciones,
  onEdit,
  onDelete,
  onImageUrl,
  onFormatFecha,
}) {
  if (publicaciones.length === 0) {
    return <p>No hay publicaciones aún.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
          <th style={{ padding: '0.5rem' }}>Imagen</th>
          <th style={{ padding: '0.5rem' }}>Título</th>
          <th style={{ padding: '0.5rem' }}>Subtítulo</th>
          <th style={{ padding: '0.5rem' }}>Descripción</th>
          <th style={{ padding: '0.5rem' }}>Fecha</th>
          <th style={{ padding: '0.5rem' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {publicaciones.map((pub) => (
          <tr key={pub.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.5rem' }}>
              <img
                src={onImageUrl(pub)}
                alt="Pub"
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                onError={(e) => { e.target.src = '/no_image.png'; }}
              />
            </td>
            <td style={{ padding: '0.5rem' }}>{pub.titulo}</td>
            <td style={{ padding: '0.5rem' }}>{pub.subtitulo}</td>
            <td style={{ padding: '0.5rem', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pub.descripcion}</td>
            <td style={{ padding: '0.5rem' }}>{onFormatFecha(pub.fecha)}</td>
            <td style={{ padding: '0.5rem' }}>
              <button onClick={() => onEdit(pub)} style={{ marginRight: '0.5rem' }}>
                Editar
              </button>
              <button onClick={() => onDelete(pub.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
