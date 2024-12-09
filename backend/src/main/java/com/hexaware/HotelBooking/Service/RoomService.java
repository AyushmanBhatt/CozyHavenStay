package com.hexaware.HotelBooking.Service;

import com.hexaware.HotelBooking.Entity.Room;
import com.hexaware.HotelBooking.Repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room createRoom(Room room) {
    	

        return roomRepository.save(room);
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id).orElse(null);

        // Check if hotel is null and throw an exception or handle accordingly
        if (roomDetails.getHotel() == null || roomDetails.getHotel().getId() == null) {
            throw new IllegalArgumentException("Hotel information must be provided.");
        }

        // Set the new values
        room.setAC(roomDetails.isAC());
        room.setRoomType(roomDetails.getRoomType());
        room.setBaseFare(roomDetails.getBaseFare());
        room.setMaxOccupancy(roomDetails.getMaxOccupancy());
        room.setHotel(roomDetails.getHotel());  // Ensure the hotel is correctly set
        room.setFeatures(roomDetails.getFeatures());

        // Save the updated room
        return roomRepository.save(room);
    }


    public String deleteRoom(Long id) {
    	Room room = roomRepository.findById(id).orElse(null);
    	if(room!=null) {
        roomRepository.deleteById(id);
    	return "Deleted";
    	}
    	else {
			return "Not Found";
    	
		}
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

	
}
