import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';

function ProductList({ selectedBrands, priceOrder }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    loadFilteredProducts();
  }, [selectedBrands, priceOrder]);

  const loadFilteredProducts = async () => {
    try {
      const result = await axios.get('http://localhost:8080/products/filter', {
        params: {
          categoryId: categoryId,
          brandIds: selectedBrands,
          priceOrder: priceOrder
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' }); // Ensure repeated param format
        }
      });

      if (result.data) {
        const productsWithImages = result.data.map(product => ({
          ...product,
          image: product.image ? `data:image/${product.imageFormat || 'jpeg'};base64,${product.image}` : 'path/to/default-image.jpg',
        }));
        setProducts(productsWithImages);
      } else {
        console.error('Failed to load filtered products');
      }
    } catch (error) {
      console.error('Error loading filtered products:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetails/${productId}`);
  };

  return (
    <div className="row product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="product-card card" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text font-weight-bold">₹{product.mrp.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
