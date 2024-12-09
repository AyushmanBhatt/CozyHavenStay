package com.hexaware.HotelBooking.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.HotelBooking.Entity.HotelOwner;

@Repository
public interface HotelOwnerRepository extends JpaRepository<HotelOwner, Long>{
	HotelOwner findByUserId(Long userId);
}
