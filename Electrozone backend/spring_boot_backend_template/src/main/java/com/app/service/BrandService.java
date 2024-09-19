package com.app.service;

import java.io.IOException;
import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.BrandDTO;
import com.app.dto.BrandResponseDTO;


public interface BrandService {
	List<BrandResponseDTO> getAllBrands();
	ApiResponse deleteBrandById(Long id);
	BrandDTO getBrandByName(String name);
	BrandDTO addBrand(BrandDTO dto) throws IOException;
	BrandDTO updateBrand(Long brandId, BrandDTO dto) throws IOException;
}
