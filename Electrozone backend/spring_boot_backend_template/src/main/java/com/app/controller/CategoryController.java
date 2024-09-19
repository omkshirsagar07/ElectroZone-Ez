package com.app.controller;

import com.app.dto.CategoryDTO;

import com.app.service.CategoryService;
import com.app.service.ImageHandlingServiceCategory;
import com.app.service.ImageHandlingServiceProduct;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    
    @Autowired
	private ImageHandlingServiceCategory imageService;
 
    @GetMapping("/view")
    public ResponseEntity<?> viewCategories() {
    	return ResponseEntity.ok
				(categoryService.getAllCategories());
    }


	@PostMapping(value = "/addcategory")
	public ResponseEntity<?> addCategoryAndImage(@ModelAttribute CategoryDTO category)
			throws IOException {
		return ResponseEntity.
				status(HttpStatus.CREATED)
				.body(categoryService.addCategory(category));
	}
	
	
	 @PutMapping("update/{categoryId}")
	    public ResponseEntity<CategoryDTO> updateCategory(
	            @PathVariable String categoryId,
	            @ModelAttribute CategoryDTO categoryDTO) throws IOException {  
	            CategoryDTO updatedCategory = categoryService.updateCategory(Long.valueOf(categoryId), categoryDTO);        
	            return ResponseEntity.ok(updatedCategory);
	     }
	
	 @GetMapping(value = "/images/{categoryId}", 
			    produces = 
			    { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
			public ResponseEntity<?> downloadImage(@PathVariable long categoryId) throws IOException {
			    return ResponseEntity.ok(imageService.serveImage(categoryId)); 
			}


    @GetMapping("/{title}")
    public ResponseEntity<?> getCategoryByTitle(@PathVariable String title) {
    	return  ResponseEntity.ok(categoryService.getCategoryByTitle(title));
       
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Long id) {
    	return ResponseEntity.ok(categoryService.deleteCategoryById(id));
        
    }
}
