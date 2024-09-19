import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addProductToCart } from '../services/cart';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaCartPlus } from 'react-icons/fa';
const API_BASE_URL = 'http://localhost:8080';

function WishlistItem({ item, onRemove }) {
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const userId = sessionStorage.getItem('id');
        const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
        const cartItems = response.data;
        const isProductInCart = cartItems.some(cartItem => cartItem.id === item.id);
        setIsInCart(isProductInCart);
      } catch (error) {
        console.error('Failed to check if product is in cart:', error);
      }
    };

    checkIfInCart();
  }, [item.id]);

  const addToCart = async () => {
    try {
      const cartDTO = {
        productId: item.id,
        userId: sessionStorage.getItem('id'),
        quantity: 1,
      };
      await addProductToCart(cartDTO);
      setIsInCart(true);
      toast.success("Product Added to Cart Successfully");
    } catch (error) {
      toast.error("Failed to Add Product to Cart");
    }
  };

  const removeFromWishlist = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/wishlist/remove`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: sessionStorage.getItem('id'),
          productId: item.id,
        },
      });

      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id });

      if (onRemove) {
        onRemove(item.id);
      }

      toast.success('Item removed from wishlist successfully');
    } catch (error) {
      toast.error('Failed to remove item from wishlist');
      console.error('Failed to remove item from wishlist:', error);
    }
  };

  const price = item.mrp - item.discount || 0;
  const imageSrc = item.image ? `data:image/${item.imageFormat || 'jpeg'};base64,${item.image}` : 'path/to/default-image.jpg';

  return (
    <div className="col-md-4 mb-4">
      <div className="card product-card">
        <img
          src={imageSrc}
          className="card-img-top"
          alt={item.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title text-truncate" title={item.name}>{item.name}</h5>
          <div className="card-text-container">
            <p className="card-text">{item.description}</p>
          </div>
          <p className="card-text font-weight-bold">₹{price.toFixed(2)}</p>
          <div className="d-flex justify-content-between align-items-center">
            {isInCart ? (
              <button
                className="btn btn-success"
                onClick={() => navigate('/cart')}
              >
                <FaShoppingCart />
              </button>
            ) : (
              <button
                className="btn btn-outline-success"
                onClick={addToCart}
              >
                <FaCartPlus />
              </button>
            )}
            <button
              onClick={removeFromWishlist}
              className="btn btn-danger"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      {/* Add custom CSS */}
      <style jsx>{`
        .product-card {
          height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-text-container {
          max-height: 4.5rem; /* Roughly 3 lines of text */
          overflow-y: auto;
        }

        .card-text {
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-text.font-weight-bold {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
}

export default WishlistItem;
