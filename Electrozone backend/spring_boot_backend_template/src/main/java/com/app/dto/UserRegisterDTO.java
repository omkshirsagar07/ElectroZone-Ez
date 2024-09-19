package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

public class UserRegisterDTO {
	  @NotBlank(message = "Name should not be blank")
	    private String name;

	    @Email(message = "Email should be valid")
	    @NotBlank(message = "Email should not be blank")
	    private String email;

	    @NotBlank(message = "Password should not be blank")
	    @Pattern(
	            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{8,}$",
	            message = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
	        )
	    private String password;

	    @Length(min = 10, message = "Phone number should be at least 10 characters")
	    @NotBlank(message = "Phone number should not be blank")
	    @Pattern(regexp = "^[0-9]*$", message = "Phone number should contain only digits")
	    private String phoneNo;
	    
	    private boolean isActive=true;

}
