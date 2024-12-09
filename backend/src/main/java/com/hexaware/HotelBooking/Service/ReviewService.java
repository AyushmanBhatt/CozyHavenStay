package com.hexaware.HotelBooking.Service;

import java.util.List;

import org.modelmapper.internal.bytebuddy.asm.Advice.Return;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.HotelBooking.Entity.Review;
import com.hexaware.HotelBooking.Repository.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	ReviewRepository reviewrep;

	public Review savereview(Review review2) {
		System.out.println(review2);
		Review review = reviewrep.save(review2);
		return review;
	}

	public Review getreviewbyid(Long reviewid) {
		Review review=reviewrep.findById(reviewid).orElse(null);
		return review;
	}

	public Review updatereview(Long reviewid, Review rev2) {
		Review review=reviewrep.findById(reviewid).orElse(null);
		if(review!=null) {
			review.setComment(rev2.getComment());
			review.setHotel(rev2.getHotel());
			review.setRating(rev2.getRating());
			review.setUser(rev2.getUser());
			reviewrep.save(review);
			return review;
		}
		else
		return null;
	}

	public String deletereview(Long reviewid) {
		Review review=reviewrep.findById(reviewid).orElse(null);
		if(review!=null)
		{
			reviewrep.delete(review);
			return "Deleted";
		}
		else {
			return "Not Found";
		}
		
	}

	public List<Review> getallreviews() {
		List<Review> li= reviewrep.findAll();
		return li;
	}

	public List<Review> getreviewbyhotelid(Long hotelid) {
		List<Review> review=reviewrep.findByHotel_Id(hotelid);
		return review;
	}

	public List<Review> getreviewbyuserid(Long userid) {
		List<Review> review=reviewrep.findByUser_Id(userid);
		return review;
	}

}
