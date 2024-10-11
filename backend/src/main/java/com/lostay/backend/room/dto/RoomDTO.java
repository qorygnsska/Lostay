package com.lostay.backend.room.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {

	private Long room_no;   					// 객실넘버	
	private Long hotel_no;						// 호텔넘버 외래키
	private String room_name;					// 객실명
	private int room_people_max;				// 객실인원(최대수) - 검색 시
	private String room_people_info;			// 객실인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	private int room_count;						// 객실 수
	private String room_thumbnail;				// 객실썸네일
	private String[] room_img;					// 객실이미지
	private int room_price;						// 객실가격
	private int room_discount;					// 객실할인율
	private String room_amenities;				// 객실편의시설
	private String room_introduction;			// 객실소개(정보)
	private LocalDateTime room_checkin_time;	// 객실체크인시간
	private LocalDateTime room_checkout_time;	// 객실체크아웃시간

}
