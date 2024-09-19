package com.app.service;

import org.springframework.http.ResponseEntity;

import com.app.dto.AdminDTO;

public interface AdminService {
	ResponseEntity<?> findByEmailAndPassword(String email, String pwd);
	AdminDTO addAdmin(AdminDTO adminDTO);

}
