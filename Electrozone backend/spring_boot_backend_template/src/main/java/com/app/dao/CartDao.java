package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Cart;
import com.app.entities.Product;
import com.app.entities.User;

public interface CartDao extends JpaRepository<Cart, Long>{
    List<Cart> findByUser(User user);
    Optional<Cart> findByUserAndProduct(User user, Product product);
}
