package com.app.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Brand;
import com.app.entities.Category;
import com.app.entities.Product;
import com.app.entities.Seller;

public interface ProductDao extends JpaRepository<Product, Long>{
	    List<Product> findByCategoryAndIsActiveTrue(Category categories);
	    List<Product> findBySeller(Seller seller);
	    List<Product> findByBrandAndIsActiveTrue(Brand brand);
	    Optional<Product> findByName(String name);	
	    List<Product> findBySellerAndIsActiveTrue(Seller seller);
	    ArrayList<Product> findByCategoryAndIsActiveTrueAndBrandInOrderByMrpAsc(Category category, Set<Brand> brands);
	    
	    ArrayList<Product> findByCategoryAndIsActiveTrueAndBrandInOrderByMrpDesc(Category category, Set<Brand> brands);
	    
//	    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.brand IN :brands AND p.isActive = true ORDER BY " +
//	            "CASE WHEN :sortDirection = 'asc' THEN p.mrp END ASC, " +
//	            "CASE WHEN :sortDirection = 'desc' THEN p.mrp END DESC")
//	    List<Product> findByCategoryAndBrandInAndIsActiveTrue(
//	            @Param("category") Category category, 
//	            @Param("brands") List<Brand> brands, 
//	            @Param("sortDirection") String sortDirection
//	    );
		

}
