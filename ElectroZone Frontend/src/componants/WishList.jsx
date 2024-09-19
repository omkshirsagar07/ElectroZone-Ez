import React, { useEffect, useState } from 'react';
import WishlistItem from './WishLIstItem';
import { useDispatch } from 'react-redux';
import { getProductsInWishlist } from '../services/wishlist';
import { updateWishlistAction } from '../features/wishlistSlice';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Import wishlist icon

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = sessionStorage.getItem('id'); // Replace with actual user ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const items = await getProductsInWishlist(userId);
        setWishlistItems(items || []);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        setWishlistItems([]);
      }
    };
    fetchWishlistItems();
  }, [userId]);

  const handleAddToCart = (id) => {
    // This function can be used to update the state or handle any additional logic after adding to cart
  };

  const handleRemove = (id) => {
    const updatedItems = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedItems);
    dispatch(updateWishlistAction(updatedItems));
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center mb-4">
          <FaHeart size={30} className="me-2 text-danger" />
          <h4 className="mb-0">Wishlist</h4>
        </div>
        <div className="row">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <p>Your wishlist is empty</p>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h4 {
          font-weight: bold;
        }
        .col-md-4 {
          margin-bottom: 20px;
        }
        .col-md-4:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Wishlist;
