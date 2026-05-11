import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { useBlogViewModel } from '../viewmodels/useBlogViewModel';

const BlogView = () => {
  const { blogs, loading, error, hasMore, loadMore } = useBlogViewModel();

  return (
    <div className="blog-page">
      <div className="container" style={{ position: 'relative' }}>
        
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '15px', color: '#2d3e40' }}>
          <ArrowLeft size={32} />
        </Link>

        <div className="blog-header text-center">
          <span className="text-green-tag">Te mostramos nuestros avances</span>
          <h1 className="section-title">¿Lo que ha logrado REDIME!?</h1>
          <p className="section-desc">En este blog podrás encontrar las novedades del proyecto, sus hitos más importantes y más.</p>
        </div>

        {error && <div style={{ color: 'red', textAlign: 'center', margin: '1rem 0' }}>{error}</div>}

        {!loading && blogs.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#666' }}>
            Aun no hay publicaciones
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map(item => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-8 mb-8">
            <button className="btn btn-lime" onClick={loadMore} disabled={loading}>
              {loading ? 'Cargando...' : 'Ver más'}
            </button>
          </div>
        )}
        
        {loading && blogs.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando publicaciones...</div>
        )}
      </div>
    </div>
  );
};

export default BlogView;
