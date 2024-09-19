package com.app.service;

import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AdminDao;
import com.app.dto.AdminDTO;
import com.app.dto.LoginResponseDTO;
import com.app.dto.UserDTO;
import com.app.entities.Admin;
import com.app.entities.User;
import com.app.security.JwtUtils;
import com.app.util.PasswordUtil;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminDao adminDao;
	
	  
    @Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtils jwtUtils;
	
    
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	  @Autowired
	    private AuthenticationManager authenticationManager;

	@Override
	public ResponseEntity<?> findByEmailAndPassword(String email, String pwd) {
		
		Admin admin = adminDao.findByEmail(email);
		
		  authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(email, pwd));
		
		  UsernamePasswordAuthenticationToken token=new 
	 				UsernamePasswordAuthenticationToken(email,pwd);
		  
		//invoke auth mgr's authenticate method;
	 		Authentication verifiedToken = authenticationManager.authenticate(token);
	 		//=> authentication n authorization  successful !
	 		System.out.println(verifiedToken.getPrincipal().getClass());//custom user details object
	 		//create JWT n send it to the clnt in response
	 		LoginResponseDTO resp=new LoginResponseDTO(jwtUtils.generateJwtToken(verifiedToken),"Successful Auth!!!!",email,admin.getId());
//	 		System.out.println(resp.toString());
	 		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
		  
	}


	@Override
	public AdminDTO addAdmin(AdminDTO adminDTO) {
		Admin admin = modelMapper.map(adminDTO, Admin.class);
		
		admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
        
        Admin savedAdmin = adminDao.save(admin);
        return modelMapper.map(savedAdmin, AdminDTO.class);
	}

}
	