package com.hexaware.HotelBooking.Entity;


import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phoneNo;

    public Booking(Long id, String name, String email, String phoneNo, String aadharImg, int noOfRooms, int noOfAdults,
			int noOfChildren, LocalDate arrivalDate, LocalDate departureDate, double totalBill, LocalDate bookingDate,
			Hotel hotel, Room room, User user, String roomType) {
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
		this.hotel = hotel;
		this.room = room;
		this.user = user;
		this.roomType = roomType;
	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	private String aadharImg;

    private int noOfRooms;

    private int noOfAdults;

    private int noOfChildren;

    private LocalDate arrivalDate;

    private LocalDate departureDate;

    private double totalBill;
    
    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    
    private Hotel hotel;

    @ManyToOne
    @JoinColumn(name = "room_id")
    
    private Room room;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	private String roomType;

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

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", name=" + name + ", email=" + email + ", phoneNo=" + phoneNo + ", aadharImg="
				+ aadharImg + ", noOfRooms=" + noOfRooms + ", noOfAdults=" + noOfAdults + ", noOfChildren="
				+ noOfChildren + ", arrivalDate=" + arrivalDate + ", departureDate=" + departureDate + ", totalBill="
				+ totalBill + ", bookingDate=" + bookingDate + ", hotel=" + hotel + ", room=" + room + ", user=" + user
				+ ", roomType=" + roomType + "]";
	}

	
	public Booking() {
		
	}

    
    
}
