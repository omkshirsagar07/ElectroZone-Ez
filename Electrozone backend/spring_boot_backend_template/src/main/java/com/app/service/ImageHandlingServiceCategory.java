package com.app.service;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.app.entities.Category;


public interface ImageHandlingServiceCategory {
	Category uploadImage( Category category, MultipartFile image) throws IOException;

	byte[] serveImage(Long categoryId) throws IOException;
}
