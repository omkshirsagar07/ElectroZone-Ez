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
public class Category extends BaseEntity{

	@NotBlank(message = "Title Should not be blank")
	private String title;
	
	@NotBlank(message = "Description Should not be blank")
	private String description;
	
	private boolean isActive;
	
	private String imagePath;
	
}
