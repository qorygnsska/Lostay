package com.lostay.backend.review.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewsDTO {

	private Long reviewNo;						// 리뷰넘버
	private double reviewRating;				// 리뷰별점
	private LocalDateTime reviewCreateAt;		// 작성날짜
	private String userNickname;				// 리뷰 작성자
	private String roomName;					// 객실명
	private String reviewContent;				// 리뷰내용
	private String[] reviewImg;					// 리뷰이미지

	
	
}
