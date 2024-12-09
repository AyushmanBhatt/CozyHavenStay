package com.hexaware.HotelBooking.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.modelmapper.ModelMapper;

import com.hexaware.HotelBooking.Entity.Hotel;
import com.hexaware.HotelBooking.Entity.Room;
import com.hexaware.HotelBooking.Entity.User;
import com.hexaware.HotelBooking.Service.HotelService;
import com.hexaware.HotelBooking.Dto.HotelDTO;
import com.hexaware.HotelBooking.Dto.RoomDTO;
import com.hexaware.HotelBooking.Dto.UserDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private ModelMapper mp; 

    
    @PostMapping("/createhotel")
    public ResponseEntity<HotelDTO> createHotel(@RequestBody HotelDTO hotel) {
    	Hotel hotel1 = mp.map(hotel, Hotel.class);
        Hotel hotel2 = hotelService.createHotel(hotel1);
        HotelDTO hotel3 = mp.map(hotel2, HotelDTO.class);
        return ResponseEntity.status(201).body(hotel3);
    }

    
    @GetMapping("/getallhotel")
    public ResponseEntity<List<HotelDTO>> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        List<HotelDTO> hotel=new ArrayList<>();
    	for(Hotel h : hotels)
    	{
    		HotelDTO x = mp.map(h, HotelDTO.class);
    		hotel.add(x);
    	}
    	if(hotel.isEmpty()) {
    		return new ResponseEntity<List<HotelDTO>>(hotel,HttpStatus.NO_CONTENT);
    	}
    	return new ResponseEntity<List<HotelDTO>>(hotel,HttpStatus.OK);
    }
    


    
    @GetMapping("gethotelbyid/{hotelId}")
    public ResponseEntity<?> getHotelById(@PathVariable Long hotelId) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        if (hotel != null) {
        	HotelDTO x = mp.map(hotel, HotelDTO.class);
        	return new ResponseEntity<HotelDTO>(x,HttpStatus.OK);
        } else {
        	return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        }
    }

    // Update a hotel
    @PutMapping("/updatehotel/{hotelId}")
    public ResponseEntity<HotelDTO> updateHotel(@PathVariable Long hotelId, @RequestBody HotelDTO hotelDetails) {
    	Hotel hotel1 = mp.map(hotelDetails, Hotel.class);
        Hotel hotel2 = hotelService.updateHotel(hotelId, hotel1);
        if (hotel2 != null) {
            HotelDTO hotel3 = mp.map(hotel2, HotelDTO.class);
            return new ResponseEntity<HotelDTO>(hotel3,HttpStatus.OK);
        } else {
        	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    
    @DeleteMapping("/deletehotel/{hotelId}")
    public ResponseEntity<String> deleteHotel(@PathVariable Long hotelId) {
        String str = hotelService.deleteHotel(hotelId);
        if (str==null) {
            return new ResponseEntity<String>(str,HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>(str,HttpStatus.OK);
        }
    }

    
    
    @GetMapping("/{hotelId}/rooms/all")
    public ResponseEntity<List<RoomDTO>> getAllRooms(@PathVariable Long hotelId) {
        List<Room> allRooms = hotelService.getAllRooms(hotelId);
        if (allRooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
			List<RoomDTO> list = allRooms.stream().map((temp)->mp.map(temp, RoomDTO.class)).toList();
			return new ResponseEntity<List<RoomDTO>>(list,HttpStatus.OK);
		}
    }

    // Add a new room to a hotel
    @PostMapping("/{hotelId}/rooms")
    public ResponseEntity<Room> addRoom(@PathVariable Long hotelId, @RequestBody Room room) {
    	Hotel hotel = hotelService.getHotelById(hotelId);
        
        // Set the hotel object in the room
        room.setHotel(hotel);
        Room addedRoom = hotelService.addRoom(hotelId, room);
        return ResponseEntity.status(201).body(addedRoom); 
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<HotelDTO>> searchHotels(@RequestParam String location, @RequestParam String roomType) {
    	System.out.println("Received location: " + location + " and roomType: " + roomType);
        List<Hotel> hotels = hotelService.searchHotels(location, roomType);
        System.out.println(hotels);
        List<HotelDTO> hotelDTOs = hotels.stream()
                .map(hotel -> mp.map(hotel, HotelDTO.class))
                .collect(Collectors.toList());

        if (hotelDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(hotelDTOs, HttpStatus.OK);
    }
    
    @GetMapping("/searchbylocation")
    public List<Hotel> getHotelsByLocation(@RequestParam String location) {
        return hotelService.findHotelsByLocation(location);
    }
    
    @GetMapping("/gethotelbyownerid/{ownerId}")
    public ResponseEntity<List<HotelDTO>> getHotelsByOwnerId(@PathVariable Long ownerId) {
        List<Hotel> hotels = hotelService.getHotelsByOwnerId(ownerId);
        if (hotels.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<HotelDTO> hotelDTOs = hotels.stream()
                .map(hotel -> mp.map(hotel, HotelDTO.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(hotelDTOs, HttpStatus.OK);
    }

}
