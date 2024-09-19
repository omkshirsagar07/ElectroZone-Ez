package com.app.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.BrandDao;
import com.app.entities.Brand;


@Service
@Transactional
public class ImageHandlingServiceBrandImpl implements ImageHandlingServiceBrand {

	    @Autowired
	    private BrandDao brandDao;
	
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
			public Brand uploadImage(Brand brand, MultipartFile image) throws IOException {
				String path = uploadFolder.concat(image.getOriginalFilename());
				System.out.println(path);
				// Use FileUtils method : writeByte[] --> File
				writeByteArrayToFile(new File(path), image.getBytes());
				// set image path in DB (product table)
				brand.setImagePath(path);
				return brand;
			}
			
			
			@Override
			public byte[] serveImage(Long brandId) throws IOException {
			Brand brand = brandDao.findById(brandId)
					.orElseThrow(() -> new ResourceNotFoundException("Invalid brand ID!!!!"));	
				String path = brand.getImagePath();
				if (path != null) {
					return readFileToByteArray(new File(path));
				} else
					throw new ApiException("Image not yet assigned !!!!");

			}

}
