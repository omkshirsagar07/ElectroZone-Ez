import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { fetchUserOrders } from '../services/user';

function OrderItems({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchUserOrders(userId);
        console.log(response.data)
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    loadOrders();
  }, [userId]);

  return (
    <div>
      <div className="container">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderItem key={order.id} order={order} />
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
}

export default OrderItems;
