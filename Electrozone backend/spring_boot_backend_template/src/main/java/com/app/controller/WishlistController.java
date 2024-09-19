package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.app.dto.ProductDTO;
import com.app.dto.ProductResponseDTO;
import com.app.dto.WishlistDTO;
import com.app.dto.ProductResponseDTO;
import com.app.service.WishlistService;
import com.app.custom_exceptions.ResourceNotFoundException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin
@Validated
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProductsInWishlist(@PathVariable @NotNull Long userId) {
        try {
            List<ProductResponseDTO> wishlist = wishlistService.getProductsInWishlist(userId);
            if (wishlist.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(wishlist);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProductToWishlist(@RequestBody @Valid WishlistDTO wishlistDTO) {
        try {
            wishlistService.addProductToWishlist(wishlistDTO);
            return ResponseEntity.status(201).body("Product added to wishlist successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeProductFromWishlist(@RequestBody @Valid WishlistDTO wishlistDTO) {
        try {
            wishlistService.removeProductFromWishlist(wishlistDTO);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
