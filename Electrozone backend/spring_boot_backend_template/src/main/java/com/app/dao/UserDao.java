package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);
    void deleteById(Long id);
    List<User> findAllByIsActiveTrue();
    Optional<User> findByIdAndIsActiveTrue(Long id);
    Optional<User> findByEmailAndPasswordAndIsActiveTrue(String email, String password);
    
    User findByEmail(String email);
	
	boolean existsByEmail(String email);
    
    

}
