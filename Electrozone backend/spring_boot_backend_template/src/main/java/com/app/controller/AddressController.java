package com.app.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AddressDTO;
import com.app.service.AddressService;

@RestController
@RequestMapping("/user/address")
@Validated
@CrossOrigin
public class AddressController {
    
    @Autowired
    private AddressService addressService;
    
    @PostMapping("/create/{userId}")
    public ResponseEntity<?> assignUserAddress(
        @PathVariable @NotBlank String userId, 
        @RequestBody @Valid AddressDTO address
    ) {
        try {
            addressService.assignUserAddress(Long.valueOf(userId), address);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllAddressByUser(@PathVariable @NotNull String userId) {
        List<AddressDTO> addresses = addressService.getAddressByUser(Long.valueOf(userId));
        return ResponseEntity.status(HttpStatus.OK).body(addresses);
    }
}
