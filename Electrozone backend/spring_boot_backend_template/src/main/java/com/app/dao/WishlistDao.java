package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;
import com.app.entities.Wishlist;
import com.app.entities.Product;


public interface WishlistDao extends JpaRepository<Wishlist, Long>{
	List<Wishlist> findByUser(User u);
	
	Optional<Wishlist> findByUserAndProduct(User user, Product product);
}
