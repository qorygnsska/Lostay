package com.lostay.backend.room.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomCustomDTO {

	private Long roomNo;   					// 객실넘버	
	private String roomName;					// 객실명
	private String roomThumbnail;				// 객실썸네일
	private String roomPeopleInfo;			// 객실인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	private int roomPeopleMax;				// 객실인원(최대수) - 검색 시
	private LocalTime roomCheckinTime;	// 객실체크인시간
	private LocalTime roomCheckoutTime;	// 객실체크아웃시간
	private int roomPrice;						// 객실가격
	private int roomDiscount;					// 객실할인율
	private int discountPrice;              // 할인된 금액
	private Long availableRooms;            // 남은 방 개수

}
