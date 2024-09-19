package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.app.entities.Brand;

public interface BrandDao extends JpaRepository<Brand, Long> {


	Optional<Brand> findByName(String name);
	List<Brand> findAllByIsActiveTrue();

}
