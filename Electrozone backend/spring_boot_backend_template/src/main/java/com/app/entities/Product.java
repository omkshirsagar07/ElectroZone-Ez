package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
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
public class Product extends BaseEntity{

	@NotBlank(message = "Name Should not be blank")
	private String name;
	
	@NotNull(message = "Price Should not be null")
	private double mrp;
	
	
	private double discount;
	
	private String imagePath;
	
	@NotBlank(message = "Decription Should not be null")
	private String description;
	
	@NotNull(message = "Qunatity Should not be null")
	private int quantity;
	
	@NotNull(message = "Specify warrenty period")
	private int warranty;
	
	private boolean isActive;
	
	@ManyToOne
	@JoinColumn(name = "brand_id")
    private Brand brand;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "seller_id")
	private Seller seller;
}
