package com.app.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
	
	 	@NotBlank(message = "Email Should not be blank")
	    private String email;

	    @NotBlank(message = "Password Should not be blank")
	    private String password;
	    
	    private String role;

}
