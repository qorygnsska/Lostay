package com.lostay.backend.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {

	private Long hotel_no;				// 호텔넘버
	
	private String hotel_name;			// 호텔명
	private String hotel_thumbnail;  	// 호텔썸네일
	private String[] hotel_image;			// 호텔이미지
	private String hotel_amenities;     // 호텔서비스/시설
	private String hotel_rating;		// 호텔등급
	private String hotel_adress;		// 호텔주소
	private String hotel_tourist_attraction;	// 호텔관광명소
	private String hotel_introduction;			// 호텔소개

}
