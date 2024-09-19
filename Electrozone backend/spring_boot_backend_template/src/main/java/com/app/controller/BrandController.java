package com.app.controller;


import com.app.dto.BrandDTO;
import com.app.service.BrandService;
import com.app.service.ImageHandlingServiceBrand;


import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/brands")
@CrossOrigin
public class BrandController {

    @Autowired
    private BrandService brandService;
    
    @Autowired
	private ImageHandlingServiceBrand imageService;

    public BrandController() {}
   
    @GetMapping("/viewBrands")
    public ResponseEntity<?> viewBrands() {
    	return ResponseEntity.ok
				(brandService.getAllBrands());
    }


	@PostMapping(value = "/addbrand")
	public ResponseEntity<?> addBrandAndImage(@ModelAttribute BrandDTO brand)
			throws IOException {
		return ResponseEntity.
				status(HttpStatus.CREATED)
				.body(brandService.addBrand(brand));
	}
	
	 @PutMapping("/update/{brandId}")
	    public ResponseEntity<BrandDTO> updateBrand(
	            @PathVariable String brandId,
	            @ModelAttribute BrandDTO brandDTO) throws IOException {  
	            BrandDTO updatedBrand = brandService.updateBrand(Long.valueOf(brandId), brandDTO);
	            
	            return ResponseEntity.ok(updatedBrand);
	        }
	
	@GetMapping(value = "/images/{brandId}", 
			produces = 
		{ IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable long brandId) throws IOException {
		return ResponseEntity.ok(imageService.serveImage(brandId));
	}
 
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Long id) {
        return ResponseEntity.ok(brandService.deleteBrandById(id));
    }
}
