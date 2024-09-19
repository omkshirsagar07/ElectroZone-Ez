package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> findByEmailAndPassword(@RequestBody LoginDTO loginDTO) {
        try {
        	
        	System.out.println(loginDTO.getEmail()+" "+loginDTO.getPassword());
            ResponseEntity<?> admin = adminService.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
            return ResponseEntity.ok(admin);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Invalid email or password");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> addAdmin(@Valid @RequestBody AdminDTO adminDTO) {
        AdminDTO Admin = adminService.addAdmin(adminDTO);
        return ResponseEntity.status(201).body(new ApiResponse("Success"));
    }
}
