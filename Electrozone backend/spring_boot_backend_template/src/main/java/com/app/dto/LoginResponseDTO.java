package com.app.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginResponseDTO {

	private String jwt;
	private String mesg;
	private String email;
	private Long id;
}
