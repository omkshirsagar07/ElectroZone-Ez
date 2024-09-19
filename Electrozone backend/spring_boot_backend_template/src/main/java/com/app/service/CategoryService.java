package com.app.service;

import java.io.IOException;
import java.util.List;


import com.app.dto.ApiResponse;
import com.app.dto.CategoryDTO;
import com.app.dto.CategoryResponseDTO;


public interface CategoryService {
	List<CategoryResponseDTO> getAllCategories();

	ApiResponse deleteCategoryById(Long id);

	CategoryDTO getCategoryByTitle(String title);


	CategoryDTO addCategory(CategoryDTO dto) throws IOException;

	CategoryDTO updateCategory(Long categoryId, CategoryDTO dto) throws IOException;


}
