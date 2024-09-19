package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO extends BaseDTO {

    @NotBlank(message = "Name should not be blank")
    private String name;

    @NotNull(message = "Price should not be null")
    @Positive(message = "Price should be a positive number")
    private double mrp;

    @Positive(message = "Discount should be a positive number")
    private double discount;

    private byte[] image;

    @NotBlank(message = "Description should not be blank")
    private String description;

    @NotNull(message = "Quantity should not be null")
    @Positive(message = "Quantity should be a positive number")
    private int quantity;

    @NotNull(message = "Specify warranty period")
    @Positive(message = "Warranty period should be a positive number")
    private int warranty;

    private boolean isActive = true;

    private String brandName;

    private String categoryName;

    private String sellerName;
}
