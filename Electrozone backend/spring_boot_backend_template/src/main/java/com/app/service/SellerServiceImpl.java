package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.SellerDao;
import com.app.dto.AdminDTO;
import com.app.dto.ApiResponse;
import com.app.dto.LoginResponseDTO;
import com.app.dto.SellerAdditionalInfoDTO;
import com.app.dto.SellerDTO;
import com.app.dto.SellerLoginDTO;
import com.app.entities.Seller;
import com.app.security.JwtUtils;
import com.app.util.PasswordUtil;
@Service
@Transactional
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerDao sellerDao;
    
    
	
   	@Autowired
   	private JwtUtils jwtUtils;
   	
   	  @Autowired
   	  private AuthenticationManager authenticationManager;
       
       @Autowired
       private PasswordEncoder passwordEncoder;


    @Autowired
    private ModelMapper modelMapper;

    @Override
    public SellerDTO findSellerById(Long id) {
        Optional<Seller> seller = sellerDao.findByIdAndIsActive(id, true);
        return seller.map(value -> modelMapper.map(value, SellerDTO.class)).orElse(null);
    }

    @Override
    public List<SellerDTO> findAllSellers() {
        List<Seller> sellers = sellerDao.findAllByIsActive(true); // Fetch active sellers
        return sellers.stream()
                .map(seller -> modelMapper.map(seller, SellerDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SellerDTO addSeller(SellerDTO sellerDto) {
        Seller seller = modelMapper.map(sellerDto, Seller.class);
        seller.setActive(true); // Set isActive to true by default
 
        seller.setPassword(passwordEncoder.encode(sellerDto.getPassword()));
        
        Seller savedSeller = sellerDao.save(seller);
        return modelMapper.map(savedSeller, SellerDTO.class);
    }


    @Override
    public ApiResponse deleteSeller(Long id) {
        Seller deleteseller = sellerDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));
        deleteseller.setActive(false);
        sellerDao.save(deleteseller); // Save the changes to update the seller
        return new ApiResponse("Seller soft deleted");
    }

    @Override
    public SellerDTO updateSeller(Long id, SellerDTO sellerDto) {
        Seller seller = sellerDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        // Update seller fields 
        seller.setName(sellerDto.getName());
        seller.setEmail(sellerDto.getEmail());
        
        seller.setPassword(passwordEncoder.encode(sellerDto.getPassword()));
        
        seller.setPhoneNo(sellerDto.getPhoneNo());
        seller.setGstNo(sellerDto.getGstNo());
        seller.setBankAccountNo(sellerDto.getBankAccountNo());
        seller.setIfscNumber(sellerDto.getIfscNumber());
        seller.setBranch(sellerDto.getBranch());
        seller.setAddress(sellerDto.getAddress());
        seller.setActive(sellerDto.isActive());
        Seller updatedSeller = sellerDao.save(seller);
        return modelMapper.map(updatedSeller, SellerDTO.class);
    }


	@Override
    public SellerAdditionalInfoDTO updateAdditionalFields(Long id, SellerAdditionalInfoDTO sellerDto) {
        Seller seller = sellerDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        // Update additional fields (Bank details)
        seller.setGstNo(sellerDto.getGstNo());
        seller.setBankAccountNo(sellerDto.getBankAccountNo());
        seller.setIfscNumber(sellerDto.getIfscNumber());
        seller.setBranch(sellerDto.getBranch());
        seller.setAddress(sellerDto.getAddress());
        //seller.setActive(sellerDto.isActive());
        Seller updatedSeller = sellerDao.save(seller);
        return modelMapper.map(updatedSeller, SellerAdditionalInfoDTO.class);
    }


	@Override
	public ResponseEntity<?>  findByEmailAndPassword(String email, String pwd) {
		
		System.out.println(email+" "+pwd);
		
		Seller seller = sellerDao.findByEmail(email);
		
		authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, pwd));
         
         UsernamePasswordAuthenticationToken token=new 
 				UsernamePasswordAuthenticationToken(email,pwd);
 		//invoke auth mgr's authenticate method;
 		Authentication verifiedToken = authenticationManager.authenticate(token);
 		//=> authentication n authorization  successful !
 		System.out.println(verifiedToken.getPrincipal().getClass());//custom user details object
 		//create JWT n send it to the clnt in response
 		LoginResponseDTO resp=new LoginResponseDTO(jwtUtils.generateJwtToken(verifiedToken),"Successful Auth!!!!", email, seller.getId());
 		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}
}
