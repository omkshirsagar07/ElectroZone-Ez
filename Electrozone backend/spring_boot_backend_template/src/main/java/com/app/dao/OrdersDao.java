package com.app.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entities.Orders;
import com.app.entities.User;




public interface OrdersDao extends JpaRepository<Orders, Long> {
	List<Orders> findByUser(User user);	
}
