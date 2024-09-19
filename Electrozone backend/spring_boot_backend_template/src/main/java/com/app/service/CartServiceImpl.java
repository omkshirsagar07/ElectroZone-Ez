package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CartDao;
import com.app.dao.ProductDao;
import com.app.dao.UserDao;
import com.app.entities.Cart;
import com.app.entities.Product;
import com.app.entities.User;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CartDTO;
import com.app.dto.ProductQuantityDTO;
import com.app.dto.ProductResponseDTO;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;
    
    @Autowired
    private ImageHandlingServiceProduct imgHandlingService;

    @Override
    public void addProductToCart(CartDTO cartDTO) {
        User user = userDao.findByIdAndIsActiveTrue(cartDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productDao.findById(cartDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Optional<Cart> cartOpt = cartDao.findByUserAndProduct(user, product);

        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            cart.setQuantity(cart.getQuantity() + cartDTO.getQuantity());
            cartDao.save(cart);
        } else {
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setProduct(product);
            newCart.setQuantity(cartDTO.getQuantity());
            cartDao.save(newCart);
        }
    }

    @Override
    public List<ProductResponseDTO> getProductsInCart(Long userId) {
        User user = userDao.findByIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Cart> cartItems = cartDao.findByUser(user);
        return cartItems.stream()
                .map(cart -> {
                    ProductResponseDTO dto = new ProductResponseDTO();
                    dto.setId(cart.getProduct().getId());
                    dto.setName(cart.getProduct().getName());
                    dto.setMrp(cart.getProduct().getMrp());
                    dto.setDiscount(cart.getProduct().getDiscount());
                    try {
                        byte[] image = imgHandlingService.serveImage(cart.getProduct().getId());
                        dto.setImage(image);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    dto.setDescription(cart.getProduct().getDescription());
                    dto.setQuantity(cart.getQuantity()); // This is the quantity in the cart
                    dto.setWarranty(cart.getProduct().getWarranty());
                    dto.setActive(cart.getProduct().isActive());
                    dto.setBrandName(cart.getProduct().getBrand().getName());
                    dto.setCategoryName(cart.getProduct().getCategory().getTitle());
                    dto.setSellerName(cart.getProduct().getSeller().getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }


    @Override
    public void updateProductQuantity(List<CartDTO> cartDTOs) {
    	
    	for(CartDTO cartDTO:cartDTOs ){
        User user = userDao.findByIdAndIsActiveTrue(cartDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productDao.findById(cartDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Cart cart = cartDao.findByUserAndProduct(user, product)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found in the user's cart"));

        cart.setQuantity(cartDTO.getQuantity());
        cartDao.save(cart);
    	}
    }

    @Override
    public void removeProductFromCart(CartDTO cartDTO) {
        User user = userDao.findByIdAndIsActiveTrue(cartDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productDao.findById(cartDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Cart cart = cartDao.findByUserAndProduct(user, product)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found in the user's cart"));

        cartDao.delete(cart);
    }

	
}
