package com.hexaware.HotelBooking.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class HotelOwner {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownerId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Hotel> hotels;

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Hotel> getHotels() {
		return hotels;
	}

	public void setHotels(List<Hotel> hotels) {
		this.hotels = hotels;
	}

	@Override
	public String toString() {
		return "HotelOwner [ownerId=" + ownerId + ", user=" + user + ", hotels=" + hotels + "]";
	}

	public HotelOwner(Long ownerId, User user, List<Hotel> hotels) {
		super();
		this.ownerId = ownerId;
		this.user = user;
		this.hotels = hotels;
	}
	
	
    
	public HotelOwner() {
		
	}
    
}
