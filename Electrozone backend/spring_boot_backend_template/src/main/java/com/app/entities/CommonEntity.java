package com.app.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class CommonEntity extends BaseEntity{
	
	@Column(unique = true)
	@NotBlank(message = "Email Should not be blank")
	private String email;
	
	@NotBlank(message = "Password Should not be blank")
	private String password;
	
	
	private String role;
}
