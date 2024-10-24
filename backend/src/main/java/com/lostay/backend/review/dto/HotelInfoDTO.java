package com.lostay.backend.review.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HotelInfoDTO {

	
	private Long hotelNo;					// 호텔넘버
	private String hotelName;				// 호텔명
	private Double ReviewRating; 			//객실리뷰평점 종합 평균
	private Long totalReviewCount; 			//객실리뷰 총 갯수 
	private List<HotelRoomsDTO> hotelRoom;   // 객실 목록 (roomNo 포함)
	
	public HotelInfoDTO(Long hotelNo, String hotelName, Double reviewRating, Long totalReviewCount) {
		super();
		this.hotelNo = hotelNo;
		this.hotelName = hotelName;
		ReviewRating = reviewRating;
		this.totalReviewCount = totalReviewCount;
	}
	
	

	
}
