import React, { useEffect, useState } from 'react';
import { getBrands } from '../services/brand';
import Brand from './Brand';

function BrandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const result = await getBrands();
      if (result) {
        const brandsWithImages = result.map(brand => ({
          ...brand,
          image: brand.image ? `data:image/svg+xml;base64,${brand.image}` : null
        }));
        setBrands(brandsWithImages);
      } else {
        console.error('Failed to load brands: ', result.message);
      }
    } catch (error) {
      console.error('Failed to load brands:', error);
    }
  };

  return (
    <div style={{ margin: 10 }}>
      <h2 className="brand-title">
        Shop by Brands{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </h2>
      <div className="scroll-container">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <Brand
              key={brand.id}
              id={brand.id}
              name={brand.name}
              image={brand.image}
            />
          ))
        ) : (
          <p>No brands available</p>
        )}
      </div>
      {/* Add CSS for smooth scrolling and hiding scrollbar */}
      <style jsx>{`
        .scroll-container {
          display: flex;
          overflow-x: auto;
          padding: 10px;
          scrollbar-width: none; /* For Firefox */
          -ms-overflow-style: none;  /* For Internet Explorer and Edge */
        }

        .scroll-container::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }

        .brand-title {
          margin-bottom: 20px;
          font-size: 1.25rem;
        }

        .scroll-container > div {
          flex: 0 0 auto;
          margin-right: 20px;
        }

        .scroll-container > div:last-child {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
}

export default BrandList;
