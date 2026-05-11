import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';

const BlogDetailView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getPublicacionById(id);
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="container mt-8 text-center" style={{ paddingTop: '50px' }}>Cargando publicación...</div>;
  }

  if (!blog) {
    return (
      <div className="container mt-8 text-center" style={{ paddingTop: '50px' }}>
        <h2>Publicación no encontrada.</h2>
        <Link to="/blog" style={{ color: '#88be2e', textDecoration: 'underline' }}>Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-det-page">
      <div className="container">
        
        <div className="blog-det-header" style={{ position: 'relative', minHeight: '120px' }}>
          <Link to="/blog" className="back-arrow" style={{ position: 'absolute', top: 0, left: 0 }}><ArrowLeft size={32} /></Link>
          <div className="text-center w-full" style={{ padding: '0 40px' }}>
            <span className="blog-det-date">{blog.date}</span>
            <h1 className="blog-det-title">{blog.title}</h1>
          </div>
        </div>

        <div className="blog-det-content">
          <div className="blog-det-text-col">
            <h2>{blog.contentHeading}</h2>
            {blog.contentParagraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
          <div className="blog-det-img-col">
            <div className="placeholder-box" style={{height: '100%'}}>
              <img 
                src={blog.img} 
                alt={blog.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => { e.target.src = '/no_image.png'; }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetailView;
