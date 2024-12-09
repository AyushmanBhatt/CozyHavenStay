package com.hexaware.HotelBooking.Dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hexaware.HotelBooking.Entity.Booking;
import com.hexaware.HotelBooking.Entity.Hotel;
import com.hexaware.HotelBooking.Entity.HotelOwner;
import com.hexaware.HotelBooking.Entity.Review;
import com.hexaware.HotelBooking.Entity.Room;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class HotelDTO {
    private Long id;

    private String name;
    private String description;
    private String image;
    private String phoneNo;
    private String location;
    private String specialFeature;

    
    private List<String> amenities;

   
    private List<Room> rooms;

   
    private List<Review> reviews;
    private HotelOwner owner;
    
   
    public HotelDTO(Long id, String name, String description, String image, String phoneNo, String location,
			String specialFeature, List<String> amenities, List<Room> rooms, List<Review> reviews, HotelOwner owner) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.image = image;
		this.phoneNo = phoneNo;
		this.location = location;
		this.specialFeature = specialFeature;
		this.amenities = amenities;
		this.rooms = rooms;
		this.reviews = reviews;
		this.owner = owner;
	}

	//private List<Booking> bookings = new ArrayList<>();

	public HotelOwner getOwner() {
		return owner;
	}

	public void setOwner(HotelOwner owner) {
		this.owner = owner;
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

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSpecialFeature() {
		return specialFeature;
	}

	public void setSpecialFeature(String specialFeature) {
		this.specialFeature = specialFeature;
	}

	public List<String> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<String> amenities) {
		this.amenities = amenities;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	
	public HotelDTO() {
		
	}


	@Override
	public String toString() {
		return "HotelDTO [id=" + id + ", name=" + name + ", description=" + description + ", image=" + image
				+ ", phoneNo=" + phoneNo + ", location=" + location + ", specialFeature=" + specialFeature
				+ ", amenities=" + amenities + ", rooms=" + rooms + ", reviews=" + reviews + ", owner=" + owner + "]";
	}

	
    
    
}
