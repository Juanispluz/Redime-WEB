import React from 'react';
import { useDatabaseViewModel } from '../viewmodels/useDatabaseViewModel.js';

/**
 * View de estado de la base de datos.
 * Renderiza solo el texto del estado de conexión, sin estilos ni diseño.
 *
 * @returns {React.ReactElement} Texto plano: "Conectado", "Error" o "" mientras carga.
 */
const StatusDbView = () => {
  const { connectionStatus, isLoading } = useDatabaseViewModel();

  if (isLoading) {
    return null;
  }

  return <span>{connectionStatus}</span>;
};

export { StatusDbView };
