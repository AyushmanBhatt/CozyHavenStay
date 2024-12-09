package com.hexaware.HotelBooking.Dto;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hexaware.HotelBooking.Entity.Booking;
import com.hexaware.HotelBooking.Enum.Roles;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;

public class UserDTO {
private Long id;

    
    
    private String name;
    private String username;
    
    public String getUsername() {
		return username;
	}

	public void setUsername(String Username) {
		username = Username;
	}
    
    private String email;
    private String password;
    

    
    private Roles role; // "USER", "OWNER", or "ADMIN"
    
    
    //private List<Booking> bookings = new ArrayList<>();



	public UserDTO(Long id, String name, String username, String email, String password, Roles role,
			List<Booking> bookings) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		//this.bookings = bookings;
	}

	/*
	 * public List<Booking> getBookings() { return bookings; }
	 * 
	 * public void setBookings(List<Booking> bookings) { this.bookings = bookings; }
	 */

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String Name) {
		name = Name;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String Email) {
		email = Email;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String Password) {
		password = Password;
	}



	public Roles getRole() {
		return role;
	}



	public void setRole(Roles role) {
		this.role = role;
	}
	
	public UserDTO() {
		
	}




	@Override
	public String toString() {
	    return "UserDTO [id=" + id + ", name=" + name + ", username=" + username + ", email=" + email + ", password=" 
				+ password + ", role=" + role + ", bookings=" + /* (bookings != null ? bookings.size() : 0) + */ "]";
	}


    
    

	
}
