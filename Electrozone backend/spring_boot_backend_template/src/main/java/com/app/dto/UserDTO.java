package com.app.dto;

import javax.validation.constraints.NotBlank;


import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

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
    
    private String role;

    private boolean isActive = true;

    // Getters and Setters
}