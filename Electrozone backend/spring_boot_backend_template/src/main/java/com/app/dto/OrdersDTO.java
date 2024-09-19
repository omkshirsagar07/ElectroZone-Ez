package com.app.dto;

import java.time.LocalDate;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.app.entities.Address;
import com.app.entities.OrderStatus;
import com.app.entities.User;

public class OrdersDTO{

	
	private double billingAmount;
	
	private LocalDate delivaryDate;
	
	private OrderStatus orderStatus;
	
	private Address address;
}
