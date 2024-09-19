package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Orders extends BaseEntity {
		
		
		private double billingAmount;
		
		@NotNull(message= "Delivary Date should not be blank")
		private LocalDate delivaryDate;
		
		
		
		@ManyToOne
		@JoinColumn(name = "user_id", nullable = false)
	    private User user;

		@Enumerated(EnumType.STRING)
		private OrderStatus orderStatus;
		
		@OneToOne
		@JoinColumn(name = "address_id")
		private Address address;
		

}
