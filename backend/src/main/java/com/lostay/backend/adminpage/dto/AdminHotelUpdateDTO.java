package com.lostay.backend.adminpage.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminHotelUpdateDTO {
	private Long hotelNo; 					// 호텔 넘버
	private String hotelName; 				// 호텔 명
	private int hotelCommission; 			// 호텔 중개료
	private String hotelAdress; 			// 호텔 주소
	private String hotelIntroduction;		// 호텔 소개
	private String hotelRating; 			// 호텔 등급
	private List<String> hotelTouristAttractionList;	// 호텔 관광명소
	private String hotelDelThumbnail;		// 호텔 삭제할 썸네일
	private List<String> hotelDelImages;	// 호텔 삭제할 이미지
	private List<String> hotelAmenities;	// 호텔 편의시설

//	private String hotelTouristAttraction;	// 호텔 관광명소


}
