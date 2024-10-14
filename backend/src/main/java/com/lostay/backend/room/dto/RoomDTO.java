package com.lostay.backend.room.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class RoomDTO {

	@NonNull
	private Long roomNo;   					// 객실넘버	
	private Long hotelNo;						// 호텔넘버 외래키
	@NonNull
	private String roomName;					// 객실명
	private int roomPeopleMax;				// 객실인원(최대수) - 검색 시
	private String roomPeopleInfo;			// 객실인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	private int roomCount;						// 객실 수
	private String roomThumbnail;				// 객실썸네일
	private String[] roomImg;					// 객실이미지
	private int roomPrice;						// 객실가격
	private int roomDiscount;					// 객실할인율
	private String roomAmenities;				// 객실편의시설
	private String roomIntroduction;			// 객실소개(정보)
	private LocalDateTime roomCheckinTime;	// 객실체크인시간
	private LocalDateTime roomCheckoutTime;	// 객실체크아웃시간
	
	// 추가
	@NonNull
	private String hotelName;

}
