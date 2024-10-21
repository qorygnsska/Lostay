package com.lostay.backend.mypage.dto;

import java.time.LocalDateTime;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewpageDTO {

	
	 private long reviewCount; // 총 리뷰 수
	    private int pagesize; // 총 페이지 수
	    private String reviewContent; // 리뷰 내용
	    private LocalDateTime reviewCreateAt; // 작성 날짜
	    private String reviewImg; // 리뷰 이미지
	    private double reviewRating; // 리뷰 평점
	    private String roomName; // 객실 이름
		
	    
	    public ReviewpageDTO(String reviewContent, LocalDateTime reviewCreateAt, String reviewImg, double reviewRating,
				String roomName) {
			super();
			this.reviewContent = reviewContent;
			this.reviewCreateAt = reviewCreateAt;
			this.reviewImg = reviewImg;
			this.reviewRating = reviewRating;
			this.roomName = roomName;
		}
	    
	    
	
}
