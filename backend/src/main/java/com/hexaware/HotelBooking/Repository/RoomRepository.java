package com.hexaware.HotelBooking.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.hexaware.HotelBooking.Entity.Room;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
	

	List<Room> findByHotel_Id(Long hotelId);

	int countByHotelId(Long hotelId);
}
