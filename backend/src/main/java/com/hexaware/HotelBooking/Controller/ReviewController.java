package com.hexaware.HotelBooking.Controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.HotelBooking.Dto.ReviewDTO;
import com.hexaware.HotelBooking.Entity.Hotel;
import com.hexaware.HotelBooking.Entity.Review;
import com.hexaware.HotelBooking.Exception.ReviewNotFoundException;
import com.hexaware.HotelBooking.Service.HotelService;
import com.hexaware.HotelBooking.Service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	
	@Autowired
	HotelService hotelService;
	
	@Autowired
	ModelMapper mp;
	
	@PostMapping("/createreview")
	public ResponseEntity<ReviewDTO> writereview(@RequestBody ReviewDTO review){
		Hotel hotel = hotelService.getHotelById(review.getHotel().getId());
	    review.setHotel(hotel);
		Review review2=mp.map(review, Review.class);
		Review review3=reviewService.savereview(review2);
		ReviewDTO review4=mp.map(review3, ReviewDTO.class);
		return new ResponseEntity<ReviewDTO>(review4,HttpStatus.CREATED);
	}
	
	@GetMapping("/getreviewbyid/{reviewid}")
	public ResponseEntity<ReviewDTO> getreview(@PathVariable Long reviewid) throws ReviewNotFoundException{
		Review review=reviewService.getreviewbyid(reviewid);
		if(review!=null)
		{
			ReviewDTO rev=mp.map(review, ReviewDTO.class);
			return new ResponseEntity<ReviewDTO>(rev,HttpStatus.OK);
			
		}
		else {
			throw new ReviewNotFoundException("No Review Exists with mentioned id");
		}
	}
	
	@PutMapping("/updatereviewbyid/{reviewid}")
	public ResponseEntity<ReviewDTO> updatereview(@PathVariable Long reviewid,@RequestBody ReviewDTO rev) throws ReviewNotFoundException{
		Review rev2=mp.map(rev, Review.class);
		Review rev3=reviewService.updatereview(reviewid,rev2);
		if(rev3!=null)
		{
			ReviewDTO rev4=mp.map(rev3, ReviewDTO.class);
			return new ResponseEntity<ReviewDTO>(rev4,HttpStatus.OK);
			
		}
		else {
			throw new ReviewNotFoundException("No Review Exists with mentioned id");
		}
	}
	
	@DeleteMapping("/deletereviewbyid/{reviewid}")
	public ResponseEntity<String> deletereview(@PathVariable Long reviewid){
		String str = reviewService.deletereview(reviewid);
		if(str.equals("Deleted"))
			return new ResponseEntity<String>(str,HttpStatus.OK);
		else {
			return new ResponseEntity<String>(str,HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getallreviews")
	public ResponseEntity<List<ReviewDTO>> getall(){
		List<Review> li=reviewService.getallreviews();
		if(li.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		else {
			List<ReviewDTO> li2=li.stream().map((temp)->mp.map(temp, ReviewDTO.class)).toList();
			return new ResponseEntity<List<ReviewDTO>>(li2,HttpStatus.OK);
		}
	}
	
	@GetMapping("/getreviewbyhotelid/{hotelid}")
	public ResponseEntity<List<ReviewDTO>> getreviewhotel(@PathVariable Long hotelid) throws ReviewNotFoundException{
		List<Review> li=reviewService.getreviewbyhotelid(hotelid);
		if(li.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		else {
			List<ReviewDTO> li2=li.stream().map((temp)->mp.map(temp, ReviewDTO.class)).toList();
			return new ResponseEntity<List<ReviewDTO>>(li2,HttpStatus.OK);
		}
	}
	
	@GetMapping("/getreviewbyuserid/{userid}")
	public ResponseEntity<List<ReviewDTO>> getreviewuser(@PathVariable Long userid) throws ReviewNotFoundException{
		List<Review> li=reviewService.getreviewbyuserid(userid);
		if(li.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		else {
			List<ReviewDTO> li2=li.stream().map((temp)->mp.map(temp, ReviewDTO.class)).toList();
			return new ResponseEntity<List<ReviewDTO>>(li2,HttpStatus.OK);
		}
	}
}
