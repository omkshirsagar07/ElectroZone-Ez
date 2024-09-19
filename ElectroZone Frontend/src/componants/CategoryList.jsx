import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/category';
import Category from './Category';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await getCategories();
      if (result) {
        const categoriesWithImages = result.map(category => ({
          ...category,
          image: category.image ? `data:image/svg+xml;base64,${category.image}` : null
        }));
        setCategories(categoriesWithImages);
      } else {
        console.error('Failed to load categories: ', result.message);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  return (
    <div style={{ margin: 10 }}>
      <h4 className="category-title">
        Shop by Category{" "}
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
      </h4>
      <div className="scroll-container">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              title={category.title}
              image={category.image}
            />
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
      {/* Add CSS for smooth scrolling */}
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

        .category-title {
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

export default CategoryList;
