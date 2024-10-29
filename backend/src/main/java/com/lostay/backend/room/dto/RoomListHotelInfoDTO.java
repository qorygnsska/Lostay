package com.lostay.backend.room.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomListHotelInfoDTO {

	private Long hotelNo;		  // 호텔넘버	
	private String hotelRating;   // 호텔성급
	private String hotelName;	  // 호텔명
	private Double reviewAvg;	// 별점 평균
	private Long totalReviewCount;	// 리뷰 총 개수
	private String hotelAdress;  		// 호텔 주소
	private String hotelIntroduction;  // 호텔 소개
	private String[] hotelAmenities;   // 호텔서비스/시설
	private String[] hotelImage;  // 호텔 이미지
	
	
	public RoomListHotelInfoDTO(Long hotelNo, String hotelRating, String hotelName, double reviewAvg,
			Long totalReviewCount, String hotelAdress, String hotelIntroduction, String hotelAmenities,
			String hotelImage) {
		super();
		this.hotelNo = hotelNo;
		this.hotelRating = hotelRating;
		this.hotelName = hotelName;
		this.reviewAvg = reviewAvg;
		this.totalReviewCount = totalReviewCount;
		this.hotelAdress = hotelAdress;
		this.hotelIntroduction = hotelIntroduction;
		String[] str = hotelAmenities.split(",");
		this.hotelAmenities = str;
		String[] str2 = hotelImage.split(",");
		this.hotelImage = str2;
	}
	
	
}
