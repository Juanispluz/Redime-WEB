import { useState, useEffect } from 'react';
import { museumService } from '../services/museumService';

/**
 * ViewModel para cargar los dispositivos de una categoría específica en el Museo.
 * 
 * @param {string} category - Categoría a cargar (ej. 'telecommunications')
 * @returns {{ devices: Array, isLoading: boolean }}
 */
export const useMuseumViewModel = (category) => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDevices = async () => {
      setIsLoading(true);
      const data = await museumService.getPublicDevices(category);
      if (isMounted) {
        setDevices(data);
        setIsLoading(false);
      }
    };

    if (category) {
      fetchDevices();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { devices, isLoading };
};
