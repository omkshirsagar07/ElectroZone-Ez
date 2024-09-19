import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantityAction, removeFromCartAction } from '../features/cartSlice';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

const API_BASE_URL = 'http://localhost:8080';

function CartItem({ item, onQuantityChange, onRemove }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  if (!item) {
    return <p>Loading...</p>;
  }

  const price = item.mrp - item.discount || 0;
  const imageSrc = item.image ? `data:image/${item.imageFormat || 'jpeg'};base64,${item.image}` : 'path/to/default-image.jpg';

  const removeFromCart = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/remove`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: sessionStorage.getItem('id'), 
          productId: item.id,
        },
      });

      dispatch(removeFromCartAction(item.id));

      if (onRemove) {
        onRemove(item.id); 
      }

      console.log('Item removed from cart successfully');
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantityAction({ id: item.id, quantity: newQuantity }));
    if (onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    dispatch(updateQuantityAction({ id: item.id, quantity: newQuantity }));
    if (onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="product-card card">
        <img
          src={imageSrc}
          className="card-img-top"
          alt={item.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h4 className="card-title">{item.name}</h4>
          <hr />
          <p className="card-text">{item.description}</p>
          <p className="card-text font-weight-bold">₹{price.toFixed(2)}</p>
          <p className="card-text">Quantity:
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
              <input
                type="text"
                className="form-control mx-2"
                value={quantity}
                readOnly
                style={{ width: '60px', textAlign: 'center' }}
              />
              <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
            </div>
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={removeFromCart}
              className="btn btn-danger"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
