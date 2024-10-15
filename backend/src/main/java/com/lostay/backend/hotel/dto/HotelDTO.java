package com.lostay.backend.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {

	private Long hotelNo;					// 호텔넘버
	
	private String hotelName;				// 호텔명
	private String hotelThumbnail;  		// 호텔썸네일
	private String[] hotelImage;			// 호텔이미지
	private String hotelAmenities;     		// 호텔서비스/시설
	private String hotelRating;				// 호텔등급
	private String hotelAdress;				// 호텔주소
	private String hotelTouristAttraction;	// 호텔관광명소
	private String hotelIntroduction;		// 호텔소개

	//특가 호텔조회시 필요한 매개변수
	private Double ReviewRating; 			//객실리뷰평점 종합 평균
	private Long totalReviewCount; 			//객실리뷰 총 갯수 
	private String roomDiscount;            //객실 할인가
	private int roomPrice;					//객실 가격
    private int roomDcPrice;               //할인된 가격	
}
