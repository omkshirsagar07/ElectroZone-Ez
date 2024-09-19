package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.entities.OrderItem;
import com.app.entities.Orders;
import com.app.entities.PaymentMethod;
import com.app.entities.User;

public interface OrderItemService {
	List<OrderItem> getAllOrderItemsOfUser(Long userId);
	List<OrderItem> getOrderItemByOrder(Long orderId);
	List<OrderItem> getOrderItemBySeller(Long sellerId);
	List<OrderItem> getAllOrderItem();
//	List<Orders> getOrdersByUser(User user);
	ApiResponse placeOrder(Long userId,Long addressId);
}
