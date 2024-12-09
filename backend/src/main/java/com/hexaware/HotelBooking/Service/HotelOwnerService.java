package com.hexaware.HotelBooking.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.HotelBooking.Entity.HotelOwner;
import com.hexaware.HotelBooking.Repository.HotelOwnerRepository;

@Service
public class HotelOwnerService {
	
	@Autowired
    private HotelOwnerRepository hotelOwnerRepository;

    public HotelOwner getHotelOwnerByUserId(Long userId) {
        return hotelOwnerRepository.findByUserId(userId);
    }

}
