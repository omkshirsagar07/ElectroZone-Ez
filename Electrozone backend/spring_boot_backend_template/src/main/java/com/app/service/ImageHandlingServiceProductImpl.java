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
import com.app.dao.ProductDao;
import com.app.entities.Product;

@Service
@Transactional
public class ImageHandlingServiceProductImpl implements ImageHandlingServiceProduct {
	@Autowired
	private ProductDao productDao;
	
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
	public Product uploadImage(Product product, MultipartFile image) throws IOException {
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		// Use FileUtils method : writeByte[] --> File
		writeByteArrayToFile(new File(path), image.getBytes());
		// set image path in DB (product table)
		product.setImagePath(path);
		return product;
	}

	
	@Override
	public byte[] serveImage(Long productId) throws IOException {
		Product product = productDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid product ID!!!!"));	
		String path = product.getImagePath();
		if (path != null) {
			// path ---> File --> byte[]
			return readFileToByteArray(new File(path));
		} else
			throw new ApiException("Image not yet assigned !!!!");

	}
	

}
