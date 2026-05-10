import { useEffect, useState } from 'react';
import { checkDatabaseConnection } from '../services/databaseService.js';

/**
 * ViewModel para el estado de la conexión a la base de datos.
 * Orquesta la llamada al service y expone el resultado a la View.
 *
 * @returns {{ connectionStatus: string, isLoading: boolean }} Estado listo para renderizar.
 */
const useDatabaseViewModel = () => {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyConnection = async () => {
      const status = await checkDatabaseConnection();
      setConnectionStatus(status);
      setIsLoading(false);
    };

    verifyConnection();
  }, []);

  return { connectionStatus, isLoading };
};

export { useDatabaseViewModel };
