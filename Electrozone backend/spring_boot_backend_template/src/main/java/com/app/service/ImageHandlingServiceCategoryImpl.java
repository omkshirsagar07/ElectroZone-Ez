package com.app.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CategoryDao;
import com.app.entities.Category;


@Service
@Transactional
public class ImageHandlingServiceCategoryImpl implements ImageHandlingServiceCategory {
     @Autowired
     private CategoryDao categoryDao;
		
		@Value("${file.upload.location}") 
		private String uploadFolder;
	

		@PostConstruct
		public void init() throws IOException {
			// chk if folder exists --yes --continue
			File folder = new File(uploadFolder);
			if (folder.exists()) {
				System.out.println("folder exists alrdy !");
			} else {
				// no --create a folder
				folder.mkdir();
				System.out.println("created a folder !");
			}
		}


		
		@Override
		public Category uploadImage(Category category, MultipartFile image) throws IOException {
			String path = uploadFolder.concat(image.getOriginalFilename());
			System.out.println(path);
			// Use FileUtils method : writeByte[] --> File
			writeByteArrayToFile(new File(path), image.getBytes());
			// set image path in DB (product table)
			category.setImagePath(path);
			return category;
		}


		@Override
	    public byte[] serveImage(Long categoryId) throws IOException {
	        Category category = categoryDao.findById(categoryId)
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid category ID!"));
	        String path = category.getImagePath();
	        if (path != null) {
	            return readFileToByteArray(new File(path));
	        } else {
	            throw new ApiException("Image not yet assigned!");
	        }
	    }
		
		
	}

