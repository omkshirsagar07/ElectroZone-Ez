package com.app.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerDTO {

    private Long id;

    @NotBlank(message = "Name Should not be blank")
    private String name;

    @NotBlank(message = "Email Should not be blank")
    private String email;

    @NotBlank(message = "Password Should not be blank")
    private String password;

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
    
    private String role;

    private boolean isActive = true;

}
