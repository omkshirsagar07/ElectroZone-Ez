import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategoryId, getProductsByBrandId } from '../services/product';
import axios from 'axios';
import qs from 'qs';

function ProductList({ selectedBrands, priceOrder }) {
  const { categoryId, brandId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      loadProductsByCategory(categoryId);
    } else if (brandId) {
      loadProductsByBrand(brandId);
    }
  }, [categoryId, brandId]);

  useEffect(() => {
    if (categoryId) {
      loadFilteredProducts(categoryId, selectedBrands, priceOrder);
    }
  }, [categoryId, selectedBrands, priceOrder]);

  const loadProductsByCategory = async (categoryId) => {
    try {
      const result = await getProductsByCategoryId(categoryId);
      if (result) {
        const productsWithImages = result.map(product => ({
          ...product,
          image: product.image ? `data:image/${product.imageFormat || 'jpeg'};base64,${product.image}` : 'path/to/default-image.jpg',
        }));
        setProducts(productsWithImages);
      } else {
        console.error('Failed to load products by category');
      }
    } catch (error) {
      console.error('Error loading products by category:', error);
    }
  };

  const loadProductsByBrand = async (brandId) => {
    try {
      const result = await getProductsByBrandId(brandId);
      if (result) {
        const productsWithImages = result.map(product => ({
          ...product,
          image: product.image ? `data:image/${product.imageFormat || 'jpeg'};base64,${product.image}` : 'path/to/default-image.jpg',
        }));
        setProducts(productsWithImages);
      } else {
        console.error('Failed to load products by brand');
      }
    } catch (error) {
      console.error('Error loading products by brand:', error);
    }
  };

  const loadFilteredProducts = async (categoryId, selectedBrands, priceOrder) => {
    try {
      const result = await axios.get('http://localhost:8080/products/filter', {
        params: {
          categoryId: categoryId,
          brandIds: selectedBrands,
          b: priceOrder
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
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
          <div key={product.id} className="col-md-4 col-sm-6 mb-4">
            <div className="product-card card" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
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
