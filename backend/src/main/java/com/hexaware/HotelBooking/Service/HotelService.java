package com.hexaware.HotelBooking.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.HotelBooking.Dto.HotelDTO;
import com.hexaware.HotelBooking.Entity.Hotel;
import com.hexaware.HotelBooking.Entity.HotelOwner;
import com.hexaware.HotelBooking.Entity.Room;
import com.hexaware.HotelBooking.Repository.HotelOwnerRepository;
import com.hexaware.HotelBooking.Repository.HotelRepository;
import com.hexaware.HotelBooking.Repository.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private HotelOwnerRepository hotelOwnerRepository;

    
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    
    public Hotel getHotelById(Long hotelId) {
    	Hotel hotel=hotelRepository.findById(hotelId).orElse(null);
        
        return hotel;
    }

    
    public Hotel createHotel(Hotel hotel) {
    	Long ownerId = hotel.getOwner().getOwnerId(); // Ensure this is a number
        HotelOwner hotelOwner = hotelOwnerRepository.findById(ownerId)
            .orElseThrow(() -> new RuntimeException("HotelOwner not found"));
        hotel.setOwner(hotelOwner);
        Hotel hotel2=  hotelRepository.save(hotel);
		return hotel2;
    }

    
    public Hotel updateHotel(Long hotelId, Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setName(hotelDetails.getName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setPhoneNo(hotelDetails.getPhoneNo());
        hotel.setDescription(hotelDetails.getDescription());
        hotel.setAmenities(hotelDetails.getAmenities());
        hotel.setImage(hotelDetails.getImage());
        hotel.setRooms(hotelDetails.getRooms());
        hotel.setSpecialFeature(hotelDetails.getSpecialFeature());
        hotel.setReviews(hotelDetails.getReviews());
        hotel.setOwner(hotelDetails.getOwner());
        
        return hotelRepository.save(hotel);
    }

    
    public String deleteHotel(Long hotelId) {
    	Hotel h= hotelRepository.findById(hotelId).orElse(null);
    	if(h!=null) {
        hotelRepository.deleteById(hotelId);
        return "Deleted";
    	}
    	else {
			return "Not Found";
		}
		
    }

    

    // Add a room to a hotel
    public Room addRoom(Long hotelId, Room room) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        room.setHotel(hotel);
        return roomRepository.save(room);
    }


	public List<Room> getAllRooms(Long hotelId) {
		List<Room> room = roomRepository.findByHotel_Id(hotelId);
        //System.out.println(room);
        return room;
	}


	public List<Hotel> searchHotels(String location, String roomType) {
        return hotelRepository.searchHotelsByLocationAndRoomType(location, roomType);
    }


	public List<Hotel> findHotelsByLocation(String location) {
        return hotelRepository.findHotelsByLocation(location);
    }


	public List<Hotel> getHotelsByOwnerId(Long ownerId) {
	    return hotelRepository.findByOwnerOwnerId(ownerId);
	}
}

