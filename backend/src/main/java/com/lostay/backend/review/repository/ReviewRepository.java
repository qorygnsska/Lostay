package com.lostay.backend.review.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {


	//Mypage리뷰 내역 조회
	 @Query("SELECT new com.lostay.backend.mypage.dto.ReviewpageDTO(r.reviewContent, r.reviewCreateAt, r.reviewImg, r.reviewRating, rm.roomName) " +
	           "FROM Review r " +
	           "JOIN r.user u " +
	           "JOIN r.room rm " +
	           "WHERE u.userNo = :userNo")
	    Page<ReviewpageDTO> findTop10ReviewPage(@Param("userNo") Long userNo, Pageable pageable);

	
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

	
	// hotel의 전체 리뷰 개수
	@Query("select COUNT(rv) from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo")
	int findHotelReviewCount(@Param("hotelNo")long hotelNo);


	List<Review> findByRoom_RoomNo(long roomNo);




}
