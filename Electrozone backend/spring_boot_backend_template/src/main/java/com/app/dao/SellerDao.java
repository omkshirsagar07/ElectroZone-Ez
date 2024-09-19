package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Seller;

public interface SellerDao extends JpaRepository<Seller, Long> {
    Optional<Seller> findByEmailAndPasswordAndIsActiveTrue(String email, String password);
    Optional<Seller> findById(Long id);
    void deleteById(Long id);
    List<Seller> findAllByIsActive(Boolean isActive);
    Optional<Seller> findByIdAndIsActive(Long id, Boolean isActive);
    
Seller findByEmail(String email);
	
	boolean existsByEmail(String Email);
}
