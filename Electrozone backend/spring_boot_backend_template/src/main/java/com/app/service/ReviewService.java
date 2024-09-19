package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.ReviewDTO;
import com.app.dto.ReviewResponseDTO;

import java.util.List;

public interface ReviewService {
    ApiResponse addReview(ReviewDTO reviewDTO);
    List<ReviewResponseDTO> getReviewsByProduct(Long productId);
    Double getAverageRating(Long productId);
}
