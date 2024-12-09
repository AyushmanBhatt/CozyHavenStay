package com.hexaware.HotelBooking.Security;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.hexaware.HotelBooking.Entity.User;  // Ensure this is your User entity
import com.hexaware.HotelBooking.Repository.UserRepository;

import java.util.List;

@Service
public class CustomUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch user from the database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Map the role to a GrantedAuthority (Spring Security expects ROLE_ prefix)
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().name());

        // Return the Spring Security User object with username, password, and role
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), List.of(authority));
    }
}
