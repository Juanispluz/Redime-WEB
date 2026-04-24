import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const BlogView = () => {
  const blogs = [
    {
      id: 1,
      title: "Logramos 10 toneladas esta semana",
      desc: "Gracias al compromiso ciudadano y superamos nuestra meta ambiental de octubre.",
      date: "5 de Nov 2025",
      img: "/blog_1.png"
    },
    {
      id: 2,
      title: "Nuestra nueva instalación en marcha",
      desc: "Nuestra recién inaugurada planta permite que reciclemos un 50% más rápido.",
      date: "12 de Nov 2025",
      img: "/blog_2.png"
    },
    {
      id: 3,
      title: "Enseñanza sobre el reciclaje en escuelas",
      desc: "Nos enorgullece anunciar nuestra alianza educativa en más de 20 escuelas.",
      date: "18 de Nov 2025",
      img: "/blog_3.png"
    },
    {
      id: 4,
      title: "Impacto del reciclaje de baterías",
      desc: "Cómo el correcto desecho de pilas y acumuladores previene desastres ecológicos.",
      date: "24 de Nov 2025",
      img: "/blog_4.png"
    }
  ];

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

        <div className="blog-grid">
          {blogs.map(item => (
            <BlogCard key={item.id} {...item} />
          ))}
        </div>

        <div className="text-center mt-8 mb-8">
          <button className="btn btn-lime">Ver más</button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
