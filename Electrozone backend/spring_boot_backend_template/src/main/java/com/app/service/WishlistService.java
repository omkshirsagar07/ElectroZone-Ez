
package com.app.service;

import java.util.List;
import com.app.dto.WishlistDTO;
import com.app.dto.ProductResponseDTO;

public interface WishlistService {
    List<ProductResponseDTO> getProductsInWishlist(Long userId);
    void addProductToWishlist(WishlistDTO wishlistDTO);
    void removeProductFromWishlist(WishlistDTO wishlistDTO);
}
