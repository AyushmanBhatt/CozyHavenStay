package com.hexaware.HotelBooking.Controller;




import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.HotelBooking.Entity.HotelOwner;
import com.hexaware.HotelBooking.Entity.LoginRequest;
import com.hexaware.HotelBooking.Entity.User;
import com.hexaware.HotelBooking.Security.JWTUtil;
import com.hexaware.HotelBooking.Service.HotelOwnerService;
import com.hexaware.HotelBooking.Service.RoomService;
import com.hexaware.HotelBooking.Service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private HotelOwnerService hotelOwnerService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            String token = jwtUtil.generateToken(authentication.getName());

         // Retrieve the roles of the authenticated user
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().stream()
                                    .map(GrantedAuthority::getAuthority)
                                    .findFirst()
                                    .orElse("ROLE_USER"); // Default role if not found

            // Prepare the response
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);

            return ResponseEntity.ok(response);


        } catch (BadCredentialsException e) {
        	Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid credentials");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    
    
    
    
    
    
    @GetMapping("/getOwnerId")
    public ResponseEntity<?> getOwnerId() {
        try {
            // Fetch the currently logged-in user's username
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username;
            if (principal instanceof UserDetails) {
                username = ((UserDetails) principal).getUsername();
            } else {
                username = principal.toString();
            }

            // Fetch the User entity based on the username
            User user = userService.findByUsername(username);  // Assume you have a service method for this
            if (user == null) {
                return ResponseEntity.notFound().build();  // Handle case where user is not found
            }

            // Fetch the HotelOwner entity based on the User ID
            HotelOwner hotelOwner = hotelOwnerService.getHotelOwnerByUserId(user.getId());

            if (hotelOwner == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(hotelOwner.getOwnerId());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching owner ID: " + e.getMessage());
        }
    }
    
    
    
    
    
    
    @GetMapping("/getUserId")
    public ResponseEntity<?> getUserId() {
        try {
            // Fetch the currently logged-in user's username
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username;
            if (principal instanceof UserDetails) {
                username = ((UserDetails) principal).getUsername();
            } else {
                username = principal.toString();
            }

            // Fetch the User entity based on the username
            User user = userService.findByUsername(username);  // Assume you have a service method for this
            if (user == null) {
                return ResponseEntity.notFound().build();  // Handle case where user is not found
            }

            return ResponseEntity.ok(user.getId()); // Return the User ID

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching user ID: " + e.getMessage());
        }
    }


}
