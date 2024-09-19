package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class User extends CommonEntity{

	@NotBlank(message = "Name Should not be blank")
	private String name;
	
	@Length(min = 10)
	@NotBlank(message = "Phone no Should not be blank")
	private String phoneNo;
	
	private String role = "USER"; 
	
	private boolean isActive;

	
}

