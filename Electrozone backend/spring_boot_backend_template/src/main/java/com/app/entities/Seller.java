package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Seller  extends CommonEntity{


	@NotBlank(message = "Name Should not be blank")
	private String name;
	
	
	
	@Length(min = 10)
	@NotBlank(message = "Phone no Should not be blank")
	private String phoneNo;
	
	@Column(unique = true)
	@Length(min = 15)
	private String gstNo;
	
	@Column(unique = true)
	private String bankAccountNo;
	
	private String ifscNumber;
	
	private String branch;
	
	private String address;
	
	private String role = "SELLER"; 
	
	private boolean isActive;
	
}
