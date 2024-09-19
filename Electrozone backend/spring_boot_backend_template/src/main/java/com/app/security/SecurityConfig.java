package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity//to enable spring sec frmwork support
@Configuration //to tell SC , this is config class containing @Bean methods
@EnableGlobalMethodSecurity(prePostEnabled = true)
//To enable method level authorization support : pre n post authorization
public class SecurityConfig {
	
	
	 @Autowired
	    private JwtAuthenticationFilter jwtFilter;
	    
	    @Autowired
	    private CustomAuthenticationEntryPoint authEntry;
	    
	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    
	    @Bean
	    public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
	        http.cors().and()
	            .csrf().disable()
	            .exceptionHandling().authenticationEntryPoint(authEntry)
	            .and()
	            .authorizeRequests()
	            .antMatchers("/products/**",  "/wishlist/**", "/brands/**", "/api/users/login", "/api/sellers/login", "/categories/**", "/api/users/**", "/users/signin", "/v*/api-doc*/**", "/swagger-ui/**", "/api/**", "/admin/login", "/user/address/**", "/**").permitAll()
	            .antMatchers(HttpMethod.OPTIONS).permitAll()
	            .antMatchers("/tickets/**", "/cart/**","/order/**").hasAnyAuthority("USER")
	            .antMatchers("/products/seller/**", "/tickets/**").hasAnyAuthority("ADMIN", "SELLER")
	            .anyRequest().authenticated()
	            .and()
	            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	            .and()
	            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	        
	        return http.build();
	    }
	    
	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
	        return config.getAuthenticationManager();
	    }
}
