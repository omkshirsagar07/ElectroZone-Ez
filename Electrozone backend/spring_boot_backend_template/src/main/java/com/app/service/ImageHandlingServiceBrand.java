package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Brand;

public interface ImageHandlingServiceBrand {

	Brand uploadImage(Brand brand, MultipartFile image) throws IOException;

	byte[] serveImage(Long brandId) throws IOException;

}
 