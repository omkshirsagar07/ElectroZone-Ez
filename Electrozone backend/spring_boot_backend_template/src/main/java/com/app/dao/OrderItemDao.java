package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.OrderItem;
import com.app.entities.Orders;
import com.app.entities.Seller;


public interface OrderItemDao extends JpaRepository<OrderItem, Long>{
	
	List<OrderItem> findBySeller(Seller s);
	List<OrderItem> findByOrder(Orders order);  
}
