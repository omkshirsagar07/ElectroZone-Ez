import React from 'react';
import { Link } from 'react-router-dom';

function Category({ id, title, image }) {
  return (
    <div style={{ display: "inline-block" }}>
      <Link to={`/category/${id}`}>
        <div
          className="card bg-dark text-white text-center category-card"
          style={{ height: 105, width: 105, margin: 10, borderRadius: 20 }}
        >
          <div className="card-body">
            <img
              style={{
                width: '80%',
                height: '70%',
                borderRadius: 20,
                marginBottom: "2px",
                filter: 'invert(100%) brightness(100%)'
              }}
              src={image || 'path/to/default-image.jpg'}
              alt={title}
            />
            <div className='text-reset' key={title} style={{ fontWeight: '600', fontSize: 15 }}>{title}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Category;
