import React from 'react';
import { Link } from 'react-router-dom';

function Brand({ id, name, image }) {
  return (
    <div style={{ display: "inline-block" }}>
      <Link to={`/brand/${id}`}>
        <div
          className="card bg-dark text-white text-center category-card"
          style={{ height: 100, width: 100, margin: 10, borderRadius: 20 }}
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
              alt={name}
            />
            <div style={{ fontWeight: '600', fontSize: 15 }}>{name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Brand;
