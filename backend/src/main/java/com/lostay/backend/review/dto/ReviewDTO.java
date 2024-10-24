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

	private Long reviewNo;						// 리뷰넘버
	
	private Long roomNo;						// 객실넘버 외래키
	private Long userNo;						// 회원넘버 외래키
	
	private double reviewRating;					// 리뷰별점
	private String reviewContent;				// 리뷰내용
	private String[] reviewImg;					// 리뷰이미지
	private LocalDateTime reviewCreateAt;		// 작성날짜
	
	private String roomName;					// 객실명
	private double reviewAvg;					// 별점 평균
	private long reviewCount;					// 리뷰 전체 개수
	private String userNickname;				// 리뷰 작성자
}
