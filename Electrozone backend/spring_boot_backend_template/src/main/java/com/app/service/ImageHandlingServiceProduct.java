package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Product;

public interface ImageHandlingServiceProduct {
	
	Product uploadImage(Product product, MultipartFile image) throws IOException;

	byte[] serveImage(Long productId) throws IOException;
}
