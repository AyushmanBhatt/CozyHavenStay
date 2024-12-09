package com.hexaware.HotelBooking.Exception;

public class UserNotFoundException extends Exception{
	String msg;
	public UserNotFoundException(String msg) {
		this.msg=msg;
	}
	
	public String getMessage() {
		return msg;
	}
}
