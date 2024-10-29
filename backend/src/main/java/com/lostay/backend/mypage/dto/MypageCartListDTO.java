package com.lostay.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MypageCartListDTO {

	private Long userNo; // 유저 넘버
	private Long cartNo; // 카트 너버
	private Long hotelNo; // 호텔넘버
	private String hotelName; // 호텔명
	private String hotelThumbnail; // 호텔썸네일
	private String hotelRating; // 호텔등급
	private Double reviewRating; // 객실리뷰평점 종합 평균
	private Long totalReviewCount; // 객실리뷰 총 갯수
	private int roomDiscount; // 객실 할인가
	private int roomPrice; // 객실 가격

	private int roomDcPrice; // 할인된 가격
//	private int pagesize; // 총 페이지 수
//
//	public MypageCartListDTO(Long userNo, Long cartNo, Long hotelNo, String hotelName, String hotelThumbnail,
//			String hotelRating, Double reviewRating, Long totalReviewCount, int roomDiscount, int roomPrice,
//			double roomDcPrice) {
//		this.userNo = userNo;
//		this.cartNo = cartNo;
//		this.hotelNo = hotelNo;
//		this.hotelName = hotelName;
//		this.hotelThumbnail = hotelThumbnail;
//		this.hotelRating = hotelRating;
//		this.reviewRating = reviewRating;
//		this.totalReviewCount = totalReviewCount;
//		this.roomDiscount = roomDiscount;
//		this.roomPrice = roomPrice;
//		this.roomDcPrice = roomDcPrice; 
//	}

}
