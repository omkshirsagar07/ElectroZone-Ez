package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminDao;
import com.app.dao.SellerDao;
import com.app.dao.UserDao;
import com.app.entities.Admin;
import com.app.entities.User;


@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private SellerDao sellerDao;

    @Autowired
    private AdminDao adminDao;

//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		// invoke dao's method
//		CommonEntity user = userDao.findByEmail(email)orElseThrow(() -> new UsernameNotFoundException("Email not found !!!!!"));
//		//=> user email exists - user : persistent
//		/*
//		 * In case of email found -- this method has to ret UserDetails object filled with details lifted from DB
//		 */
//		return new CustomUserDetails(user);
//	}
	
	
	
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try to find the user in all three repositories
        if (adminDao.existsByEmail(email)) {
        	
            return new CustomUserDetails(adminDao.findByEmail(email));
        } else if (sellerDao.existsByEmail(email)) {
            return new CustomUserDetails(sellerDao.findByEmail(email));
        } else if (userDao.existsByEmail(email)) {
        	User user = userDao.findByEmail(email);
        	System.out.println(user.toString());
        	
        	CustomUserDetails auth = new CustomUserDetails(userDao.findByEmail(email));
        	System.out.println("Autho :"+auth.toString());
        	
            return auth;
        } else {
            throw new UsernameNotFoundException("Email not found in any role");
        }
    }

}
