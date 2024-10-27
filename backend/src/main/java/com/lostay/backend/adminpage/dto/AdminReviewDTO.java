package com.lostay.backend.adminpage.dto;

import java.time.LocalDate;
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
	private String userName; // 작성자 이름
	private String hotelName;//호텔이름
	private String roomName; // 객실명
	private double reviewRating; // 평점
	private String reviewContent; // 리뷰내용
	private LocalDateTime reviewCreateAt; // 작성날짜
	private LocalDate reviewSanctionsAt; 
	
	
	//(1027 JIP 수정: 개별DTO 필드변수에서 pagesize 제거)
	//private int pagesize; // 총 페이지 수
	
	
	//public AdminReviewDTO(Long reviewNo, String userName, String hotelName, String roomName, double reviewRating,
	//		String reviewContent, LocalDateTime reviewCreateAt, LocalDate reviewSanctionsAt) {
	//	super();
	//	this.reviewNo = reviewNo;
	//	this.userName = userName;
	//	this.hotelName = hotelName;
	//	this.roomName = roomName;
	//	this.reviewRating = reviewRating;
	//	this.reviewContent = reviewContent;
	//	this.reviewCreateAt = reviewCreateAt;
	//	this.reviewSanctionsAt =reviewSanctionsAt;
	//}
	
	
	


	

}
