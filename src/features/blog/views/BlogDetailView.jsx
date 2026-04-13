import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const BlogDetailView = () => {
  const { id } = useParams();
  
  const blogsData = {
    1: {
      title: "Logramos 10 toneladas esta semana",
      date: "5 de Nov 2025",
      img: "/blog_1.png",
      contentHeading: "Cada vez más cerca de nuestra meta",
      contentParagraphs: [
        "Gracias a la participación ciudadana hemos logrado la recolección de más de 10 toneladas de AEE (aparatos eléctricos y electrónicos). Los usuarios están siendo partícipes dentro de esta cultura del cambio y en cómo reciclamos estos dispositivos. Se recuerda que los custodios de la memoria estarán dando sus opiniones en redes para que todos estén pendientes y atentos a su contribución.",
        "Gracias a la ayuda ciudadana por hacer parte de este gran proyecto. Estos residuos serán aprovechados de tantas formas como sean posibles. Seguiremos con las campañas de concientización hasta el próximo año y será entonces cuando aproximadamente el 50% de la población sea culturizada al respecto de cómo se deben reciclar estos dispositivos y que no es solo un acto de reciclar, sino de conmemorar."
      ]
    },
    2: {
      title: "Nuestra nueva instalación en marcha",
      date: "12 de Nov 2025",
      img: "/blog_2.png",
      contentHeading: "Un gran salto tecnológico para REDIME",
      contentParagraphs: [
        "Esta semana inauguramos nuestra nueva planta de procesamiento de residuos electrónicos. Con más de 500 metros cuadrados y tecnología de última generación, ahora podemos separar componentes críticos mucho más rápido y de manera más segura.",
        "El esfuerzo en conjunto con las instituciones locales ha dado sus frutos, permitiendo que miles de ciudadanos ahora puedan reciclar toneladas de material de manera eficiente y escalable."
      ]
    },
    3: {
      title: "Enseñanza sobre el reciclaje en escuelas",
      date: "18 de Nov 2025",
      img: "/blog_3.png",
      contentHeading: "Sembrando el futuro del reciclaje",
      contentParagraphs: [
        "REDIME acaba de concretar alianzas con 20 instituciones a nivel nacional para llevar módulos interactivos sobre el cuidado de nuestras materias primas. Estudiantes de distintas edades aprenden el valor de lo que hoy consideramos basura.",
        "La respuesta de los jóvenes ha sido increíble: no solo entienden la problemática técnica y química, sino que llevan el mensaje directo a sus hogares transformando la cultura de toda una familia."
      ]
    },
    4: {
      title: "Impacto del reciclaje de baterías antiguas",
      date: "24 de Nov 2025",
      img: "/blog_4.png",
      contentHeading: "Protegiendo el ecosistema local",
      contentParagraphs: [
        "El reciclaje correcto de pilas y baterías permite recuperar metales valiosos y evitar que químicos altamente tóxicos como el litio y cadmio lleguen a nuestras aguas subterráneas y ríos.",
        "Gracias a los protocolos de seguridad de REDIME y al apoyo de cada uno de los ciudadanos, esta semana pudimos aislar residuos que hubieran significado un daño irreversible a nuestra flora y fauna."
      ]
    }
  };

  const blog = blogsData[id] || blogsData[1];

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
              <img src={blog.img} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetailView;
