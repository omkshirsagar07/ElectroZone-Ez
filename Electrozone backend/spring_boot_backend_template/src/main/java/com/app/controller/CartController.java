package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.app.dto.CartDTO;
import com.app.service.CartService;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/cart")
@CrossOrigin
@Validated
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addProductToCart(@RequestBody @Valid CartDTO cartDTO) {
        cartService.addProductToCart(cartDTO);
        return ResponseEntity.status(201).body("Product added to cart successfully");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getProductsInCart(userId));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProductQuantity(@RequestBody @Valid List<CartDTO> cartDTOs) {
    	
    		
    		cartService.updateProductQuantity(cartDTOs);
    
        return ResponseEntity.ok("Product quantity updated successfully");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeProductFromCart(@RequestBody @Valid CartDTO cartDTO) {
        cartService.removeProductFromCart(cartDTO);
        return ResponseEntity.ok("Product removed from cart successfully");
    }
}
