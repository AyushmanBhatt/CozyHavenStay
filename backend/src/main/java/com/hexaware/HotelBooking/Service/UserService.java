package com.hexaware.HotelBooking.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.HotelBooking.Entity.HotelOwner;
import com.hexaware.HotelBooking.Entity.User;
import com.hexaware.HotelBooking.Enum.Roles;
import com.hexaware.HotelBooking.Repository.HotelOwnerRepository;
import com.hexaware.HotelBooking.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
	
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
    @Autowired
    private UserRepository userRepository;  
    
    @Autowired
    private HotelOwnerRepository hotelOwnerRepository;  

    
    public User registerUser(User user) {
    	User user1 = userRepository.save(user);
    	if (user1.getRole() == Roles.HOTEL_OWNER) {
            HotelOwner hotelOwner = new HotelOwner();
            hotelOwner.setUser(user1);
            hotelOwnerRepository.save(hotelOwner);
        }
        return user1;
    }

    
    

    // Find a user by their ID
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    
    public User updateUser(Long id, User userDetails) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setName(userDetails.getName());
        
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setUsername(userDetails.getUsername());
        if(userDetails.getPassword()!=null) {
        //System.out.println(userDetails.getPassword());
        userDetails.setPassword(encodePassword(userDetails.getPassword()));
        //System.out.println(userDetails.getPassword());
        existingUser.setPassword(userDetails.getPassword());
        }
        
        
        return userRepository.save(existingUser);
    }

    
    public String deleteUser(Long id) {
    	User u= userRepository.findById(id).orElse(null);
    	if(u!=null) {
        userRepository.deleteById(id);
		return "Deleted";
    	}
    	else {
			return "Not Found";
		}
    }




	public List<User> showall() {
		List<User> user=userRepository.findAll();
		return user;
		
	}




	public List<User> getUsersByRole(Roles role) {
		List<User> li=userRepository.findByRole(role);
		return li;
	}




	public String encodePassword(String password) {
        // Encrypt the password using BCryptPasswordEncoder
        return passwordEncoder.encode(password);
    }




	public User findByUsername(String string) {
		User u = userRepository.findByUsername(string).orElse(null);
		return u;
	}




	public User save(User user) {
		return userRepository.save(user);
		
	}
}
