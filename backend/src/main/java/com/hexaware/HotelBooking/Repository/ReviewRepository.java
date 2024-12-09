package com.hexaware.HotelBooking.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.HotelBooking.Entity.Hotel;
import com.hexaware.HotelBooking.Entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	//List<Review> findByHotel(Hotel hotel);

	List<Review> findByHotel_Id(Long hotelid);

	List<Review> findByUser_Id(Long userid);

	int countByHotelId(Long hotelId);
}
