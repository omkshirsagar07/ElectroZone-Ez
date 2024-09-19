package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.app.dto.CategoryDTO;
import com.app.dto.CategoryResponseDTO;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CategoryDao;
import com.app.dto.ApiResponse;

import com.app.entities.Category;


@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired 
	private ImageHandlingServiceCategory imgHandlingService;
	
	@Override
	public List<CategoryResponseDTO> getAllCategories() {
        List<Category> categories = categoryDao.findAllByIsActiveTrue();
        List<CategoryResponseDTO> categoryResponseDTOs = new ArrayList<>();

        for (Category category : categories) {
            CategoryResponseDTO dto = new CategoryResponseDTO();
            dto.setId(category.getId());
            dto.setTitle(category.getTitle());
            dto.setDescription(category.getDescription());
            dto.setActive(category.isActive());

            try {
                byte[] image = imgHandlingService.serveImage(category.getId());
                dto.setImage(image);
            } catch (IOException e) {
                e.printStackTrace();
            }

            categoryResponseDTOs.add(dto);
        }

        return categoryResponseDTOs;
    }

	 @Override
	    public CategoryDTO addCategory(CategoryDTO dto) throws IOException {
				Category category= mapper.map(dto, Category.class);
				category = imgHandlingService.uploadImage(category, dto.getImage());
				Category savedCategory = categoryDao.save(category);
				return mapper.map(savedCategory, CategoryDTO.class);

			
		}
	 
	 
	 @Override
	   public CategoryDTO updateCategory(Long categoryId, CategoryDTO dto) throws IOException {

	        // Fetch the existing category
	        Category existingCategory = categoryDao.findById(categoryId)
	                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

	        // Update fields from DTO
	        existingCategory.setTitle(dto.getTitle());
	        existingCategory.setDescription(dto.getDescription());
	        existingCategory.setActive(dto.isActive());

	        // Handle image update if a new image is provided
	        MultipartFile newImage = dto.getImage();
	        if (newImage != null && !newImage.isEmpty()) {
	            existingCategory = imgHandlingService.uploadImage(existingCategory, newImage);
	        }

	        // Save the updated category
	        Category updatedCategory = categoryDao.save(existingCategory);

	        // Map the updated category entity back to DTO
	        return mapper.map(updatedCategory, CategoryDTO.class);
	        
	 }
	 
	 
	@Override
	public CategoryDTO getCategoryByTitle(String title) {
		   Category category= categoryDao.findByTitle(title)
	                .orElseThrow(() -> new ResourceNotFoundException("Category not found with title: " + title));
		   return mapper.map(category, CategoryDTO.class);
	  }
	
	@Override
	 
    public ApiResponse deleteCategoryById(Long id) {
        Category category = categoryDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid category id !!!!"));
        category.setActive(false);
        return new ApiResponse("Category soft deleted successfully");
    }

	
	}


