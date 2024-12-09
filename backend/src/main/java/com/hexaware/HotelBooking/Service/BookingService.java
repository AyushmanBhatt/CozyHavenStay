package com.hexaware.HotelBooking.Service;

import com.hexaware.HotelBooking.Entity.Booking;
import com.hexaware.HotelBooking.Entity.User;
import com.hexaware.HotelBooking.Enum.Roles;
import com.hexaware.HotelBooking.Repository.BookingRepository;
import com.hexaware.HotelBooking.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(Booking booking) {
    	
        return bookingRepository.save(booking);
    	
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if(booking!=null) {
        booking.setAadharImg(bookingDetails.getAadharImg());
        booking.setArrivalDate(bookingDetails.getArrivalDate());
        booking.setDepartureDate(bookingDetails.getDepartureDate());
        booking.setEmail(bookingDetails.getEmail());
        booking.setHotel(bookingDetails.getHotel());
        booking.setName(bookingDetails.getName());
        booking.setNoOfAdults(bookingDetails.getNoOfAdults());
        booking.setNoOfChildren(booking.getNoOfChildren());
        booking.setNoOfRooms(bookingDetails.getNoOfRooms());
        booking.setPhoneNo(bookingDetails.getPhoneNo());
        booking.setRoom(bookingDetails.getRoom());
        booking.setRoomType(bookingDetails.getRoomType());
        booking.setTotalBill(bookingDetails.getTotalBill());
        booking.setUser(bookingDetails.getUser());
        return bookingRepository.save(booking);
        }
        else {
			return null;
		}
    }

    public String deleteBooking(Long id) {
    	Booking booking = bookingRepository.findById(id).orElse(null);
        if(booking!=null) {
        	bookingRepository.deleteById(id);
        	return "Deleted";
        }
        else {
			return "Not Found";
		}
    }

    public List<Booking> getAllBookings() {
        List<Booking> li= bookingRepository.findAll();
        return li;
    }

	public List<Booking> getBookingByUserId(Long userid) {
		List<Booking> booking = bookingRepository.findByUser_Id(userid);
		return booking;
	}

	
	  public List<Booking> getBookingByHotelId(Long hotelid) { 
		  List<Booking> list=bookingRepository.findByHotel_Id(hotelid); 
		  return list;
	  }
	 
}
