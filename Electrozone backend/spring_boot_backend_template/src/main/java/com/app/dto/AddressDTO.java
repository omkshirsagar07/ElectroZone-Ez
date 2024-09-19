package com.app.dto;

import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {
    
    private Long id;  // Add this field to include address ID in the response

    @NotBlank(message = "Customer Name should not be blank")
    private String custName;

    @Length(min = 10, message = "Phone Number should be between 10 and 15 characters")
    @NotBlank(message = "Phone Number should not be blank")
    private String phoneNo;

    private String addressLine1;
    private String addressLine2;
    private String landMark;

    @NotBlank(message = "City should not be blank")
    private String city;

    @NotBlank(message = "State should not be blank")
    private String state;

    @Length(min = 6, message = "Pin Code should be exactly 6 characters")
    private String pinCode;
}
