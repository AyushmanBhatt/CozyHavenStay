package com.hexaware.HotelBooking.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.HotelBooking.Entity.User;
import com.hexaware.HotelBooking.Enum.Roles;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByUsername(String username);

	List<User> findByRole(Roles role);
}
