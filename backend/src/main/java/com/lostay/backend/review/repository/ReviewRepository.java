package com.lostay.backend.review.repository;

import org.springframework.data.domain.Page;
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



}
