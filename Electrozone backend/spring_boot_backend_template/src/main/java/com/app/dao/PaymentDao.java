package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Payment;
import com.app.entities.Orders;

public interface PaymentDao extends JpaRepository<Payment, Long> {
	Payment findByOrder(Orders order);
}
