package com.app.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.app.dto.BrandDTO;
import com.app.dto.CategoryDTO;
import com.app.dto.ProductDTO;
import com.app.dto.ProductResponseDTO;
import com.app.dto.SellerDTO;

import com.app.service.ImageHandlingServiceProduct;
import com.app.service.ProductService;



@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ImageHandlingServiceProduct imageService;
	
public ProductController() {
	
}

	@GetMapping
	public ResponseEntity<?> viewProducts() {
		return ResponseEntity.ok
				(productService.getAllProducts());
	}
		
	@PostMapping("/addproduct")
	public ResponseEntity<?> addProductAndImage(@ModelAttribute ProductDTO product)
			throws IOException {
		return ResponseEntity.
				status(HttpStatus.CREATED)
				.body(productService.addProduct(product));
	}
	
	

    @PutMapping("/update/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable String productId,
            @ModelAttribute ProductDTO productDTO) throws IOException  {     
         
            ProductDTO updatedProduct = productService.updateProduct(Long.valueOf(productId), productDTO);
            return ResponseEntity.ok(updatedProduct);        		
        }            		
            		
	@GetMapping(value = "/images/{productId}", produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable long productId) throws IOException {
		return ResponseEntity.ok(imageService.serveImage(productId));
	}

	@GetMapping("/category/{categoryId}")
	public ResponseEntity<?> getProductsByCategory(@PathVariable Long categoryId) {
	    CategoryDTO categoryDTO = new CategoryDTO();
	    categoryDTO.setId(categoryId);
	    List<ProductResponseDTO> products = productService.getAllProductsByCategory(categoryDTO);

	    return ResponseEntity.ok(products);
	}
	
	
	@GetMapping("/details/{productId}")
	public ResponseEntity<?> getProductsByID(@PathVariable String productId) {
	    
	    ProductResponseDTO product = productService.getProductById(productId);

	    return ResponseEntity.ok(product);
	}

	    @GetMapping("seller/{sellerId}")
	    public ResponseEntity<?> getProductsBySeller(@PathVariable String sellerId) {
	        SellerDTO seller = new SellerDTO();
	        seller.setId(Long.valueOf(sellerId));
	        return ResponseEntity.ok(productService.getAllProductsBySeller(seller));
	        
	    }


    @GetMapping("/brand/{brandId}")
    public ResponseEntity<?> getProductsByBrand(@PathVariable Long brandId) {
        BrandDTO brand = new BrandDTO();
        brand.setId(brandId);
        return ResponseEntity.ok(productService.getAllProductsByBrand(brand));
    }
	
	
	
	// customer should be able to purchase products
	@PutMapping("/purchase/{id}/{qty}")
	public ResponseEntity<?> purchaseProducts(@PathVariable Long id,
			@PathVariable int qty) {
		return ResponseEntity.ok
				(productService.purchase(id,qty));
	}


	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteProducts(@PathVariable Long id) {
		return ResponseEntity.ok
				(productService.deleteProductById(id));
	}

	@GetMapping("/filter")
	public ArrayList<ProductResponseDTO> filterProductsByCategoryAndBrand(
	         @RequestParam String categoryId,
	         @RequestParam Set<String> brandIds,
	         @RequestParam boolean b) {
	     
	    System.out.println(categoryId + " " + b);
	    System.out.println(brandIds.toString());

	    // Convert brandIds to Set of BrandDTOs
	    Set<BrandDTO> brandDTOs = brandIds.stream().map(id -> {
	        BrandDTO brandDTO = new BrandDTO();
	        brandDTO.setId(Long.valueOf(id));
	        return brandDTO;
	    }).collect(Collectors.toSet());

	    // Create CategoryDTO
	    CategoryDTO categoryDTO = new CategoryDTO();
	    categoryDTO.setId(Long.valueOf(categoryId));

	    // Call the service method
	    return productService.getAllProductsByCategoryAndBrand(brandDTOs, categoryDTO, b);
	}

}