package com.hexaware.HotelBooking.Dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hexaware.HotelBooking.Entity.Hotel;
import com.hexaware.HotelBooking.Entity.Room;
import com.hexaware.HotelBooking.Entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class BookingDTO {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phoneNo;

    private String aadharImg;

    private int noOfRooms;

    private int noOfAdults;

    private int noOfChildren;

    private LocalDate arrivalDate;

    private LocalDate departureDate;

    private double totalBill;
    
    public BookingDTO(Long id, String name, String email, String phoneNo, String aadharImg, int noOfRooms,
			int noOfAdults, int noOfChildren, LocalDate arrivalDate, LocalDate departureDate, double totalBill,
			LocalDate bookingDate, Long hotelId, Long roomId, Long userId, String roomType) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phoneNo = phoneNo;
		this.aadharImg = aadharImg;
		this.noOfRooms = noOfRooms;
		this.noOfAdults = noOfAdults;
		this.noOfChildren = noOfChildren;
		this.arrivalDate = arrivalDate;
		this.departureDate = departureDate;
		this.totalBill = totalBill;
		this.bookingDate = bookingDate;
		this.hotelId = hotelId;
		this.roomId = roomId;
		this.userId = userId;
		this.roomType = roomType;
	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	@Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    private Long hotelId; // Only ID
    
    private Long roomId;  // Only ID
    private Long userId;  // Only ID


	public Long getHotelId() {
		return hotelId;
	}

	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	private String roomType;
    




	public BookingDTO() {
    	
    }


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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAadharImg() {
		return aadharImg;
	}

	public void setAadharImg(String aadharImg) {
		this.aadharImg = aadharImg;
	}

	public int getNoOfRooms() {
		return noOfRooms;
	}

	public void setNoOfRooms(int noOfRooms) {
		this.noOfRooms = noOfRooms;
	}

	public int getNoOfAdults() {
		return noOfAdults;
	}

	public void setNoOfAdults(int noOfAdults) {
		this.noOfAdults = noOfAdults;
	}

	public int getNoOfChildren() {
		return noOfChildren;
	}

	public void setNoOfChildren(int noOfChildren) {
		this.noOfChildren = noOfChildren;
	}

	public LocalDate getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(LocalDate arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public LocalDate getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(LocalDate departureDate) {
		this.departureDate = departureDate;
	}

	public double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(double totalBill) {
		this.totalBill = totalBill;
	}

	

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	@Override
	public String toString() {
		return "BookingDTO [id=" + id + ", name=" + name + ", email=" + email + ", phoneNo=" + phoneNo + ", aadharImg="
				+ aadharImg + ", noOfRooms=" + noOfRooms + ", noOfAdults=" + noOfAdults + ", noOfChildren="
				+ noOfChildren + ", arrivalDate=" + arrivalDate + ", departureDate=" + departureDate + ", totalBill="
				+ totalBill + ", bookingDate=" + bookingDate + ", hotelId=" + hotelId + ", roomId=" + roomId
				+ ", userId=" + userId + ", roomType=" + roomType + "]";
	}

	
	
    
    

}
