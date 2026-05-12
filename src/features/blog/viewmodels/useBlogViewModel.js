import { useState, useEffect, useCallback } from 'react';
import { blogService } from '../services/blogService';

export const useBlogViewModel = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data, lastDoc: newLastDoc, hasMore: more } = await blogService.getPublicaciones();
      setBlogs(data);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (err) {
      setError('Error al cargar las publicaciones.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    setError('');
    try {
      const { data, lastDoc: newLastDoc, hasMore: more } = await blogService.getPublicaciones(lastDoc);
      setBlogs((prev) => [...prev, ...data]);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (err) {
      setError('Error al cargar más publicaciones.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return {
    blogs,
    loading,
    error,
    hasMore,
    loadMore
  };
};
