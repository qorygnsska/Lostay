package com.lostay.backend.adminpage.dto;

import java.time.LocalDateTime;
import java.util.Set;

import com.lostay.backend.cart.dto.CartDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminReviewDTO {

	private Long reviewNo; // 리뷰넘버
	private String roomName; // 객실명
	private double reviewRating; // 평점
	private String reviewContent; // 리뷰내용
	private String userName; // 작성자 이름
	private LocalDateTime reviewCreateAt; // 작성날짜
	private int pagesize; // 총 페이지 수
	
	
	public AdminReviewDTO(Long reviewNo, String roomName, double reviewRating, String reviewContent, String userName,
			LocalDateTime reviewCreateAt) {
		super();
		this.reviewNo = reviewNo;
		this.roomName = roomName;
		this.reviewRating = reviewRating;
		this.reviewContent = reviewContent;
		this.userName = userName;
		this.reviewCreateAt = reviewCreateAt;
	}



	

}
