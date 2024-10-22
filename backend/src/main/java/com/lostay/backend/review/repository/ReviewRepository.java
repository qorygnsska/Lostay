package com.lostay.backend.review.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	
	// 객실리스트 전체 리뷰 조회
	@Query("select rv.reviewContent, rv.reviewImg, rv.reviewCreateAt, rv.reviewRating"
			+ ", r.roomNo, u.userNo, r.roomName, rv.reviewNo from Review rv "
			+ "Join rv.room r  "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo")
	List<Object[]> findHotelReview(@Param("hotelNo")long hotelNo);

	
	// 객실리스트 최근 3개 리뷰 조회
	@Query("select rv.reviewContent, rv.reviewCreateAt, rv.reviewRating "
			+ ", r.roomNo, u.userNo, r.roomName, rv.reviewNo from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo "
			+ "ORDER BY rv.reviewCreateAt DESC ")	
	List<Object[]> findHotelReview3(@Param("hotelNo")long hotelNo,Pageable pageable);


	// hotel의 전체 리뷰 별점 평균
	@Query("select AVG(rv.reviewRating) from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo")
	double findHotelReviewAvg(@Param("hotelNo")long hotelNo);

}
