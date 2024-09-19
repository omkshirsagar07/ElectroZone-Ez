import React, { useEffect, useState } from 'react';
import { fetchAllOrders } from '../services/admin'; // Adjust the path to your service file

function AdminOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await fetchAllOrders();
      console.log(ordersData)
      setOrders(ordersData.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  return (
    <div>
      <div className="container col-lg-12">
        <table className="table table-responsive table-striped bg-dark text-white text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Product</th>
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
                  <td>{orderItem.order.user.name}</td> {/* Assuming User entity has a 'name' field */}
                  <td>{orderItem.seller.name || 'N/A'}</td> {/* Assuming the seller's name is accessible this way */}
                  <td>{orderItem.product.name || 'N/A'}</td> {/* Assuming the product's name is accessible this way */}
                  <td>{new Date(orderItem.createdOn).toLocaleDateString()}</td> {/* Assuming 'createdAt' is the purchase date */}
                  <td>{new Date(orderItem.order.delivaryDate).toLocaleDateString()}</td>
                  <td>{orderItem.order.orderStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrderList;
