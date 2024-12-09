package com.hexaware.HotelBooking.Dto;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hexaware.HotelBooking.Entity.Booking;
import com.hexaware.HotelBooking.Entity.Hotel;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class RoomDTO {
	private Long id;
    private String roomType; 
    private int maxOccupancy; 
    private double baseFare;
    private boolean isAC;
    @ElementCollection
    private List<String> features;
    
    private Hotel hotel;
    
    

    private List<Booking> bookings = new ArrayList<>();
    
	public RoomDTO(Long id, String roomType, int maxOccupancy, double baseFare, boolean isAC, List<String> features,
			Hotel hotel, List<Booking> bookings) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.maxOccupancy = maxOccupancy;
		this.baseFare = baseFare;
		this.isAC = isAC;
		this.features = features;
		this.hotel = hotel;
		this.bookings = bookings;
	}
	public List<Booking> getBookings() {
		return bookings;
	}
	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public int getMaxOccupancy() {
		return maxOccupancy;
	}
	public void setMaxOccupancy(int maxOccupancy) {
		this.maxOccupancy = maxOccupancy;
	}
	public double getBaseFare() {
		return baseFare;
	}
	public void setBaseFare(double baseFare) {
		this.baseFare = baseFare;
	}
	public boolean isAC() {
		return isAC;
	}
	public void setAC(boolean isAC) {
		this.isAC = isAC;
	}
	public List<String> getFeatures() {
		return features;
	}
	public void setFeatures(List<String> features) {
		this.features = features;
	}
	public Hotel getHotel() {
		return hotel;
	}
	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	@Override
	public String toString() {
	    return "RoomDTO [id=" + id + ", roomType=" + roomType + ", maxOccupancy=" + maxOccupancy + ", baseFare=" 
	            + baseFare + ", isAC=" + isAC + ", features=" + features + ", hotelId=" + hotel.getId() 
	            + ", bookingsCount=" + (bookings != null ? bookings.size() : 0) + "]";
	}

	
	public RoomDTO() {
		
	}
    
    
}
