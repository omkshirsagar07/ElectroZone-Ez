import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchOrdersBySeller } from '../services/seller';

function SellerOrderList({ sellerId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrdersBySeller(sellerId);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    if (sellerId) {
      loadOrders();
    }
  }, [sellerId]);

  return (
    <div>
      <div className="container col-lg-12">
        <table className="table table-responsive table-striped bg-dark text-white text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Purchase Date</th>
              <th>Delivery Date</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((orderItem, index) => (
                <tr key={orderItem.id}>
                  <td>{index + 1}</td>
                  <td>{orderItem.order.user.name}</td>
                  <td>{orderItem.product.name}</td>
                  <td>{orderItem.quantity}</td> {/* Ensure this is the correct quantity field */}
                  <td>{orderItem.order.address.addressLine1},{orderItem.order.address.addressLine2},{orderItem.order.address.landMark}, {orderItem.order.address.city},{orderItem.order.address.state},{orderItem.order.address.pinCode}</td> {/* Modify as per your address structure */}
                  <td>{new Date(orderItem.createdOn).toLocaleDateString()}</td>
                  <td>{new Date(orderItem.order.delivaryDate).toLocaleDateString()}</td>
                  <td>{orderItem.order.orderStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerOrderList;
