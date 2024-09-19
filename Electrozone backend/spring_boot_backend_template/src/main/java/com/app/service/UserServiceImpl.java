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

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.ApiResponse;
import com.app.dto.LoginResponseDTO;
import com.app.dto.UserDTO;
import com.app.entities.User;
import com.app.security.JwtUtils;
import com.app.util.PasswordUtil;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ModelMapper modelMapper;
    
	@Autowired
	private JwtUtils jwtUtils;
	
	  @Autowired
	  private AuthenticationManager authenticationManager;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO findById(Long id) {
        Optional<User> user = userDao.findByIdAndIsActiveTrue(id);
        return user.map(value -> modelMapper.map(value, UserDTO.class)).orElse(null);
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userDao.findAllByIsActiveTrue();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse deleteUser(Long id) {
        User deleteUser = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found!!"));
        deleteUser.setActive(false);
        return new ApiResponse("User soft deleted.");
    }

    @Override
    public UserDTO addUser(UserDTO userDto) {
        User user = modelMapper.map(userDto, User.class);
        user.setActive(true); // Set isActive to true by defaults
        String hashedPassword = PasswordUtil.hashPassword(userDto.getPassword());
        user.setPassword(hashedPassword);
        User savedUser = userDao.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }


    @Override
    public UserDTO updateUser(Long id, UserDTO userDto) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        

        user.setPhoneNo(userDto.getPhoneNo());
        user.setActive(userDto.isActive());
        User updatedUser = userDao.save(user);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public ResponseEntity<?> findByEmailAndPassword(String email, String password) {
    	
    	User user = userDao.findByEmail(email);
    	
    	System.out.println();
    	authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
         
         UsernamePasswordAuthenticationToken token=new 
 				UsernamePasswordAuthenticationToken(email,password);
 		//invoke auth mgr's authenticate method;
 		Authentication verifiedToken = authenticationManager.authenticate(token);
 		//=> authentication n authorization  successful !
 		System.out.println(verifiedToken.getPrincipal().getClass());//custom user details object
 		//create JWT n send it to the clnt in response
 		LoginResponseDTO resp=new LoginResponseDTO(jwtUtils.generateJwtToken(verifiedToken),"Successful Auth!!!!", email,user.getId());
 	
 		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
       
    }
}
