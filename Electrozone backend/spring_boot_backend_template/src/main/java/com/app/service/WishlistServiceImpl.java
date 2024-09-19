package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.ProductDao;
import com.app.dao.UserDao;
import com.app.dao.WishlistDao;
import com.app.entities.Product;
import com.app.entities.User;
import com.app.entities.Wishlist;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ProductResponseDTO;
import com.app.dto.WishlistDTO;
import com.app.dto.ProductResponseDTO;
import com.app.service.ImageHandlingServiceProduct;

@Service
@Transactional
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistDao wishlistDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private ImageHandlingServiceProduct imgHandlingService;

    @Override
    public List<ProductResponseDTO> getProductsInWishlist(Long userId) {
        User user = userDao.findByIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Wishlist> wishlistItems = wishlistDao.findByUser(user);

       
        
        return wishlistItems.stream()
                .map(wishlist -> {
                    Product product = wishlist.getProduct();
                    ProductResponseDTO dto = new ProductResponseDTO();
                    dto.setId(product.getId());
                    dto.setName(product.getName());
                    dto.setMrp(product.getMrp());
                    dto.setDiscount(product.getDiscount());
                    try {
                        byte[] image = imgHandlingService.serveImage(product.getId());
                        dto.setImage(image);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    dto.setDescription(product.getDescription());
                    dto.setQuantity(0); // Quantity is not used in wishlist
                    dto.setWarranty(product.getWarranty());
                    dto.setActive(product.isActive());
                    dto.setBrandName(product.getBrand().getName());
                    dto.setCategoryName(product.getCategory().getTitle());
                    dto.setSellerName(product.getSeller().getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void addProductToWishlist(WishlistDTO wishlistDTO) {
        User user = userDao.findById(wishlistDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productDao.findById(wishlistDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Optional<Wishlist> wishlistOpt = wishlistDao.findByUserAndProduct(user, product);

        if (!wishlistOpt.isPresent()) {
            Wishlist wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlist.setProduct(product);
            wishlistDao.save(wishlist);
        } else {
            System.out.println("Product already exists in wishlist");
        }
    }

    @Override
    public void removeProductFromWishlist(WishlistDTO wishlistDTO) {
        User user = userDao.findById(wishlistDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productDao.findById(wishlistDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Wishlist wishlist = wishlistDao.findByUserAndProduct(user, product)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found in the user's wishlist"));

        wishlistDao.delete(wishlist);
    }
}
