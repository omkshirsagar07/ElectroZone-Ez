package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.BrandDao;
import com.app.dao.CategoryDao;
import com.app.dao.ProductDao;
import com.app.dao.SellerDao;
import com.app.dto.ApiResponse;
import com.app.dto.BrandDTO;
import com.app.dto.CategoryDTO;
import com.app.dto.ProductDTO;
import com.app.dto.ProductResponseDTO;
import com.app.dto.SellerDTO;
import com.app.entities.Brand;
import com.app.entities.Category;

import com.app.entities.Product;
import com.app.entities.Seller;
		
	
@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
    @Autowired
    private ProductDao productDao;
    
    @Autowired
    private SellerDao sellerDao;
    
    @Autowired
    private BrandDao brandDao;
    
    @Autowired
    private CategoryDao categoryDao;
    
    @Autowired
    private ImageHandlingServiceProduct imgHandlingService;
    
    @Autowired
	private ModelMapper mapper;

    @Override
    public List<ProductDTO> getAllProducts()  {
    	 return productDao.findAll() 
 				.stream() 
 				.map(product -> mapper.map(product, ProductDTO.class)) 
 				.collect(Collectors.toList());
    	
    
     }
    
    
    
    @Override
    public ProductDTO addProduct(ProductDTO dto) throws IOException {

			Product product = mapper.map(dto, Product.class);
			product.setBrand(brandDao.findById(dto.getBrandId())
					.orElseThrow(()->new ResourceNotFoundException("Not Found")));
			product.setCategory(categoryDao.findById(dto.getCategoryId())
					.orElseThrow(()->new ResourceNotFoundException("Not Found")));
			product.setSeller(sellerDao.findById(dto.getSellerId())
					.orElseThrow(()->new ResourceNotFoundException("Not Found")));
			
			product = imgHandlingService.uploadImage(product, dto.getImage());
			Product savedProduct = productDao.save(product);
			//System.out.println(savedProduct.toString());
			return mapper.map(savedProduct, ProductDTO.class);

		
	}
   
    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO dto) throws IOException {

        // Fetch the existing product
        Product existingProduct = productDao.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Update fields that come from the DTO
        existingProduct.setName(dto.getName());
        existingProduct.setMrp(dto.getMrp());
        existingProduct.setDiscount(dto.getDiscount());
        existingProduct.setDescription(dto.getDescription());
        existingProduct.setQuantity(dto.getQuantity());
        existingProduct.setWarranty(dto.getWarranty());
        existingProduct.setActive(dto.isActive());
        
        // Update associations
        existingProduct.setBrand(brandDao.findById(dto.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found")));
        existingProduct.setCategory(categoryDao.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found")));
        existingProduct.setSeller(sellerDao.findById(dto.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found")));

        // Handle image update if a new image is provided
        MultipartFile newImage = dto.getImage();
        if (newImage != null && !newImage.isEmpty()) {
            existingProduct = imgHandlingService.uploadImage(existingProduct, newImage);
        }

        // Save the updated product
        Product updatedProduct = productDao.save(existingProduct);

        // Map the updated product entity back to DTO
        return mapper.map(updatedProduct, ProductDTO.class);
    }

    @Override
    public ApiResponse purchase(Long productId, int qty) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));
        if (!product.isActive()) {
            throw new ResourceNotFoundException("Product is not active");
        }
        product.setQuantity(product.getQuantity() - qty);
        productDao.save(product);
        return new ApiResponse("Purchased product");
    }

    @Override
    public List<ProductDTO> getAllProductsByName(String name) {
        return productDao.findByName(name)	
        		.stream() 
				.map(product -> mapper.map(product, ProductDTO.class)) 
				.collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDTO> getAllProductsByCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId(categoryDTO.getId());
        List<Product> products = productDao.findByCategoryAndIsActiveTrue(category);
        return products.stream().map(product -> {
            ProductResponseDTO dto = new ProductResponseDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setMrp(product.getMrp());
            dto.setDiscount(product.getDiscount());
            try {
                byte[] image = imgHandlingService.serveImage(product.getId());
                dto.setImage(image);
            } catch (IOException e) {
                e.printStackTrace();
            }
            dto.setDescription(product.getDescription());
            dto.setQuantity(product.getQuantity());
            dto.setWarranty(product.getWarranty());
            dto.setActive(product.isActive());
            dto.setBrandName(product.getBrand().getName()); // Adjust according to your actual model
            dto.setCategoryName(product.getCategory().getTitle()); // Adjust according to your actual model
            dto.setSellerName(product.getSeller().getName()); // Adjust according to your actual model
            return dto;
        }).collect(Collectors.toList());
    }


    @Override
    public ProductResponseDTO getProductById(String id) {
        
        Optional<Product> product = productDao.findById(Long.parseLong(id));
        
            ProductResponseDTO dto = new ProductResponseDTO();
            dto.setId(product.get().getId());
            dto.setName(product.get().getName());
            dto.setMrp(product.get().getMrp());
            dto.setDiscount(product.get().getDiscount());
            try {
                byte[] image = imgHandlingService.serveImage(product.get().getId());
                dto.setImage(image);
            } catch (IOException e) {
                e.printStackTrace();
            }
            dto.setDescription(product.get().getDescription());
            dto.setQuantity(product.get().getQuantity());
            dto.setWarranty(product.get().getWarranty());
            dto.setActive(product.get().isActive());
            dto.setBrandName(product.get().getBrand().getName()); // Adjust according to your actual model
            dto.setCategoryName(product.get().getCategory().getTitle()); // Adjust according to your actual model
            dto.setSellerName(product.get().getSeller().getName()); // Adjust according to your actual model
            return dto;
        
    }

    @Override
    public List<ProductResponseDTO> getAllProductsBySeller(SellerDTO sellerdto) {
        Seller seller = mapper.map(sellerdto, Seller.class);
        
        return productDao.findBySellerAndIsActiveTrue(seller)
                .stream()
                .map(product -> {
                    ProductResponseDTO dto = new ProductResponseDTO();
                    dto.setId(product.getId());
                    dto.setName(product.getName());
                    dto.setMrp(product.getMrp());
                    dto.setDiscount(product.getDiscount());
                    try {
                        byte[] image = imgHandlingService.serveImage(product.getId());
                        dto.setImage(image);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    dto.setDescription(product.getDescription());
                    dto.setQuantity(product.getQuantity());
                    dto.setWarranty(product.getWarranty());
                    dto.setActive(product.isActive());
                    dto.setBrandName(product.getBrand().getName()); // Adjust according to your actual model
                    dto.setCategoryName(product.getCategory().getTitle()); // Adjust according to your actual model
                    dto.setSellerName(product.getSeller().getName()); // Adjust according to your actual model
                    return dto;
                })
                .collect(Collectors.toList());
    }


    @Override
    public List<ProductResponseDTO> getAllProductsByBrand(BrandDTO brandDTO) {
        Brand brand = new Brand();
        brand.setId(brandDTO.getId());

        List<Product> products = productDao.findByBrandAndIsActiveTrue(brand);

        return products.stream().map(product -> {
            ProductResponseDTO dto = new ProductResponseDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setMrp(product.getMrp());
            dto.setDiscount(product.getDiscount());
            try {
                byte[] image = imgHandlingService.serveImage(product.getId());
                dto.setImage(image);
            } catch (IOException e) {
                e.printStackTrace();
            }
            dto.setDescription(product.getDescription());
            dto.setQuantity(product.getQuantity());
            dto.setWarranty(product.getWarranty());
            dto.setActive(product.isActive());
            dto.setBrandName(product.getBrand().getName()); // Adjust according to your actual model
            dto.setCategoryName(product.getCategory().getTitle()); // Adjust according to your actual model
            dto.setSellerName(product.getSeller().getName()); // Adjust according to your actual model
            return dto;
        }).collect(Collectors.toList());
    }



    @Override
    public ApiResponse deleteProductById(Long productId) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));
        product.setActive(false);
        return new ApiResponse("Product soft deleted");
    }



	




//	@Override
//	public List<ProductResponseDTO> getFilteredProducts(BrandDTO brandDTO, CategoryDTO categoryDTO, List<Long> brandIds, String sortDirection) {
//        Brand brand = new Brand();
//        brand.setId(brandDTO.getId());
//        Category category = new Category();
//        category.setId(categoryDTO.getId());
//
//        // Convert brandIds to Brand entities
//        List<Brand> brands = brandIds.stream().map(id -> {
//            Brand b = new Brand();
//            b.setId(id);
//            return b;
//        }).collect(Collectors.toList());
//
//        List<Product> products = productDao.findByCategoryAndBrandInAndIsActiveTrue(category, brands, sortDirection);
//
//        return products.stream().map(product -> {
//            ProductResponseDTO dto = new ProductResponseDTO();
//            dto.setId(product.getId());
//            dto.setName(product.getName());
//            dto.setMrp(product.getMrp());
//            dto.setDiscount(product.getDiscount());
//            try {
//                byte[] image = imgHandlingService.serveImage(product.getId());
//                dto.setImage(image);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            dto.setDescription(product.getDescription());
//            dto.setQuantity(product.getQuantity());
//            dto.setWarranty(product.getWarranty());
//            dto.setActive(product.isActive());
//            dto.setBrandName(product.getBrand().getName());
//            dto.setCategoryName(product.getCategory().getTitle());
//            dto.setSellerName(product.getSeller().getName());
//            return dto;
//        }).collect(Collectors.toList());
//    }
	
	@Override
	public ArrayList<ProductResponseDTO> getAllProductsByCategoryAndBrand(Set<BrandDTO> brandDTOs, CategoryDTO categoryDTO, boolean b) {
	    // Convert BrandDTOs to Brand entities
	    Set<Brand> brands = (Set<Brand>) brandDTOs.stream().map(brandDTO -> {
	        Brand brand = new Brand();
	        brand.setId(brandDTO.getId());
	        return brand;
	    }).collect(Collectors.toSet());

	    // Convert CategoryDTO to Category entity
	    Category category = new Category();
	    category.setId(categoryDTO.getId());
	    
	    ArrayList<Product> products;

	    // Fetch products matching the category and list of brands
	    if(b) {
		     products = (ArrayList<Product>) productDao.findByCategoryAndIsActiveTrueAndBrandInOrderByMrpAsc(category, brands);
	    }else {
		     products = (ArrayList<Product>) productDao.findByCategoryAndIsActiveTrueAndBrandInOrderByMrpDesc(category, brands);

	    }
	    // Map products to ProductResponseDTOs
	    return (ArrayList<ProductResponseDTO>) products.stream().map(product -> {
	        ProductResponseDTO dto = new ProductResponseDTO();
	        dto.setId(product.getId());
	        dto.setName(product.getName());
	        dto.setMrp(product.getMrp());
	        dto.setDiscount(product.getDiscount());
	        try {
	            byte[] image = imgHandlingService.serveImage(product.getId());
	            dto.setImage(image);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        dto.setDescription(product.getDescription());
	        dto.setQuantity(product.getQuantity());
	        dto.setWarranty(product.getWarranty());
	        dto.setActive(product.isActive());
	        dto.setBrandName(product.getBrand().getName());
	        dto.setCategoryName(product.getCategory().getTitle());
	        dto.setSellerName(product.getSeller().getName());
	        return dto;
	    }).collect(Collectors.toList());
	}

}
