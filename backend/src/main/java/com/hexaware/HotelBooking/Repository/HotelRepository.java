package com.hexaware.HotelBooking.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexaware.HotelBooking.Entity.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long>{
	@Query("SELECT h FROM Hotel h WHERE h.location = :location")
	List<Hotel> findHotelsByLocation(String location);

	
	
	@Query("SELECT h FROM Hotel h JOIN h.rooms r WHERE LOWER(h.location) = LOWER(:location) AND LOWER(r.roomType) = LOWER(:roomType)")
		List<Hotel> searchHotelsByLocationAndRoomType(String location, String roomType);



	List<Hotel> findByOwnerOwnerId(Long ownerId);


}
