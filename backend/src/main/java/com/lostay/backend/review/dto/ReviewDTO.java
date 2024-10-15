package com.lostay.backend.review.dto;

import java.time.LocalDateTime;

import com.lostay.backend.reservation.dto.ReservationDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

	private Long review_no;						// 리뷰넘버
	
	private Long room_no;						// 객실넘버 외래키
	private Long user_no;						// 회원넘버 외래키
	
	private double review_rating;					// 리뷰별점
	private String review_content;				// 리뷰내용
	private String[] review_img;					// 리뷰이미지
	private LocalDateTime review_create_At;		// 작성날짜
}
