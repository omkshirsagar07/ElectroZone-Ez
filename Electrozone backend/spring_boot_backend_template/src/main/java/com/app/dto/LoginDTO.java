package com.app.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {


 	@NotBlank(message = "Email Should not be blank")
    private String email;

    @NotBlank(message = "Password Should not be blank")
    private String password;
    
}
