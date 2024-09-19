package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.BrandDao;
import com.app.dto.ApiResponse;
import com.app.dto.BrandDTO;
import com.app.dto.BrandResponseDTO;
import com.app.entities.Brand;


@Service 
@Transactional
public class BrandServiceImpl implements BrandService {
	 @Autowired
	    private BrandDao brandDao;
	 @Autowired
	 private ModelMapper mapper;
	 @Autowired
	 private ImageHandlingServiceBrand imgHandlingService;

	 @Override
	 public List<BrandResponseDTO> getAllBrands() {
	     List<Brand> brands = brandDao.findAllByIsActiveTrue();
	     List<BrandResponseDTO> brandResponseDTOs = new ArrayList<>();

	     for (Brand brand : brands) {
	         BrandResponseDTO dto = new BrandResponseDTO();
	         dto.setId(brand.getId());
	         dto.setName(brand.getName());
	         dto.setActive(brand.isActive());

	         try {
	             byte[] image = imgHandlingService.serveImage(brand.getId());
	             dto.setImage(image);
	         } catch (IOException e) {
	             e.printStackTrace();
	         }

	         brandResponseDTOs.add(dto);
	     }

	     return brandResponseDTOs;
	 }

	 
	 @Override
	    public BrandDTO addBrand(BrandDTO dto) throws IOException {

				Brand brand = mapper.map(dto,Brand.class);
				
				brand = imgHandlingService.uploadImage(brand, dto.getImage());
				Brand savedbrand= brandDao.save(brand);
				return mapper.map(savedbrand, BrandDTO.class);

			
		}
	 @Override
	  public BrandDTO updateBrand(Long brandId, BrandDTO dto) throws IOException {

	        // Fetch the existing brand
	        Brand existingBrand = brandDao.findById(brandId)
	                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));

	        // Update fields from DTO
	        existingBrand.setName(dto.getName());
	        existingBrand.setActive(dto.isActive());

	        // Handle image update if a new image is provided
	        MultipartFile newImage = dto.getImage();
	        if (newImage != null && !newImage.isEmpty()) {
	            existingBrand = imgHandlingService.uploadImage(existingBrand, newImage);
	        }

	        // Save the updated brand
	        Brand updatedBrand = brandDao.save(existingBrand);

	        // Map the updated brand entity back to DTO
	        return mapper.map(updatedBrand, BrandDTO.class);
	    }
	 

	 @Override
		public BrandDTO getBrandByName(String name) {
			   Brand brand=brandDao.findByName(name)
		                .orElseThrow(() -> new ResourceNotFoundException("brand not found with name: " +name ));
			   return mapper.map(brand, BrandDTO.class);
			   
		  }
	    @Override
	    public ApiResponse deleteBrandById(Long id) {
	        Brand brand = brandDao.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + id));
	        brand.setActive(false);
	        return new ApiResponse("Brand soft deleted successfully");
	    }
	}

