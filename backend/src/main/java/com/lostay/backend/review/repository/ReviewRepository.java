package com.lostay.backend.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query("select rv from Review rv "
			+ "Join rv.room r  "
			+ "Join r.hotel h "
			+ "Where h.hotelNo = :hotelNo")
	List<Review> findHotelReview(@Param("hotelNo")long hotelNo);

}
