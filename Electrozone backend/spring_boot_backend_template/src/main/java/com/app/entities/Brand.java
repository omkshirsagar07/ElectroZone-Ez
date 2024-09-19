package com.app.entities;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Brand extends BaseEntity{

	@NotBlank(message = "Brand Name Should not be blank")
	private String name;

	private boolean isActive;
	
	private String imagePath;
	
}
