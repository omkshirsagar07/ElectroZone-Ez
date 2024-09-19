
package com.app.service;

import com.app.dao.ProductDao;
import com.app.dao.ReviewDao;
import com.app.dao.UserDao;
import com.app.dto.ApiResponse;
import com.app.dto.ReviewDTO;
import com.app.dto.ReviewResponseDTO;
import com.app.entities.Product;
import com.app.entities.Review;
import com.app.entities.User;

import com.app.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewDao reviewRepository;

    @Autowired
    private ProductDao productRepository;

    @Autowired
    private UserDao userRepository;

    @Override
    public ApiResponse addReview(ReviewDTO reviewDTO) {
        Product product = productRepository.findById(reviewDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setRating(reviewDTO.getRating());
        review.setDescription(reviewDTO.getDescription());
        review.setProduct(product);
        review.setUser(user);

        Review savedReview = reviewRepository.save(review);

        return new ApiResponse("Review Added Successfully");
        }

    @Override
    public List<ReviewResponseDTO> getReviewsByProduct(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviews.stream().map(review -> new ReviewResponseDTO(
                review.getId(),
                review.getRating(),
                review.getDescription(),
                review.getProduct().getName(),
                review.getUser().getName()
        )).collect(Collectors.toList());
    }

    @Override
    public Double getAverageRating(Long productId) {
    	
    	Double avgRating = 0.0;
    	
    	List<Review> reviews = reviewRepository.findByProductId(productId);
    	
    	for(Review r :reviews)
    	{
    		avgRating += r.getRating();
    	}
    	
        return avgRating/reviews.size();
    }
}
