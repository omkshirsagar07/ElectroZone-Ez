package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.CartDTO;
import com.app.dto.ProductQuantityDTO;
import com.app.dto.ProductResponseDTO;

public interface CartService {
    void addProductToCart(CartDTO cartDTO);
    List<ProductResponseDTO> getProductsInCart(Long userId);
    void updateProductQuantity(List<CartDTO> cartDTOs);
    void removeProductFromCart(CartDTO cartDTO);
}
