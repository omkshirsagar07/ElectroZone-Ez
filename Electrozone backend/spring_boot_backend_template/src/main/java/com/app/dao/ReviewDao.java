package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Product;
import com.app.entities.Review;

public interface ReviewDao extends JpaRepository<Review, Long>{
	List<Review> findByProductId(Long productId);
    Double findAverageRatingByProductId(Long productId);
}
