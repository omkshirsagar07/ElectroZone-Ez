package com.app.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Category;

public interface CategoryDao extends JpaRepository<Category, Long>{

		Optional<Category> findByTitle(String title);
		List<Category> findAllByIsActiveTrue();
}
