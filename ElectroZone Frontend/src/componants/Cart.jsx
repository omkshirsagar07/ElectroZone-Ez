import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { getCartByUserId, updateCartInBackend } from '../services/cart';
import { updateCartAction } from '../features/cartSlice';
import { useNavigate } from "react-router-dom";
import { updateAmount } from "../features/grandTotal";
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const userId = sessionStorage.getItem('id'); // Replace with actual user ID
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculateGrandTotal = (items) => {
        return items.reduce((total, item) => {
            const price = item.mrp - item.discount || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCartByUserId(userId);
                setCartItems(items || []);
                setGrandTotal(calculateGrandTotal(items || []));
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setCartItems([]);
            }
        };
        fetchCartItems();
    }, [userId]);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        setGrandTotal(calculateGrandTotal(updatedItems));
    };

    const handleRemove = (id) => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        setGrandTotal(calculateGrandTotal(updatedItems));
    };

    const proceedToCheckout = async () => {
        try {
            dispatch(updateCartAction(cartItems));

            const cartDTOs = cartItems.map(item => ({
                userId: userId,
                productId: item.id,
                quantity: item.quantity
            }));

            console.log(cartDTOs)

            await updateCartInBackend(cartDTOs);
            dispatch(updateAmount(grandTotal))
            console.log('Cart updated and ready for checkout!');
            navigate('/Checkout');
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="d-flex align-items-center mb-4">
                    <FaShoppingCart size={30} className="me-2 text-primary" />
                    <h4 className="mb-0">Shopping Cart</h4>
                </div>
                <div className="row">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
            </div>
            <div className="container my-4">
                <div className="bg-light rounded p-3 d-flex justify-content-between align-items-center shadow-sm">
                    <h5 className="mb-0 fw-bold">Grand Total: ₹{grandTotal.toFixed(2)}</h5>
                    <button className="btn btn-warning btn-lg" onClick={proceedToCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            {/* Custom CSS */}
            <style jsx>{`
                .container {
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                .text-muted {
                    color: #6c757d;
                }
                .bg-light {
                    background-color: #f8f9fa;
                }
                .shadow-sm {
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h4 {
                    font-weight: bold;
                }
                .btn-warning {
                    background-color: #ffc107;
                    border-color: #ffc107;
                    font-size: 1rem;
                    font-weight: 500;
                    text-transform: uppercase;
                }
                .btn-warning:hover {
                    background-color: #e0a800;
                    border-color: #d39e00;
                }
            `}</style>
        </div>

    );
}

export default Cart;
