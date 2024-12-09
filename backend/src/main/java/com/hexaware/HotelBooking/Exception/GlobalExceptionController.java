package com.hexaware.HotelBooking.Exception;

import java.time.LocalDateTime;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionController {
	
	 @ExceptionHandler(RoomNotFoundException.class) 
	 public ResponseEntity<ErrorDetails> noRoleF(RoomNotFoundException ex) { 
		 ErrorDetails error= new ErrorDetails(LocalDateTime.now(),ex.getMessage(),"location not found " ,"No_Room_Found");
		 return new ResponseEntity<>(error,HttpStatus.NOT_FOUND); 
	 }
	 
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorDetails> noUserF(UserNotFoundException ex)
	{
		ErrorDetails error= new ErrorDetails(LocalDateTime.now(),ex.getMessage(),"location not found ","No_User_Found");
		return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(BookingNotFoundException.class)
	public ResponseEntity<ErrorDetails> noBookingF(BookingNotFoundException ex)
	{
		ErrorDetails error= new ErrorDetails(LocalDateTime.now(),ex.getMessage(),"location not found ","No_Booking_Found");
		return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ReviewNotFoundException.class)
	public ResponseEntity<ErrorDetails> noReviewF(ReviewNotFoundException ex)
	{
		ErrorDetails error=new ErrorDetails(LocalDateTime.now(),ex.getMessage(),"Location not found","No_Review_Exist");
		return new ResponseEntity<ErrorDetails>(error,HttpStatus.NOT_FOUND);
	}
}
