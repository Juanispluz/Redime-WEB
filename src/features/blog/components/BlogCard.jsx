import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, img, title, desc, date }) => {
  return (
    <Link to={`/blog/${id}`} className="blog-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div className="blog-img-placeholder">
         <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="blog-card-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="blog-date">{date}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
