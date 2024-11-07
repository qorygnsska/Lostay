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
	
	private int availableRoomsCnt;	// 레디스까지 포함한 남은 방 개수
	
	public RoomCustomDTO(Long roomNo, String roomName, String roomThumbnail, String roomPeopleInfo, int roomPeopleMax,
			LocalTime roomCheckinTime, LocalTime roomCheckoutTime, int roomPrice, int roomDiscount, int discountPrice,
			Long availableRooms) {

		this.roomNo = roomNo;
		this.roomName = roomName;
		this.roomThumbnail = roomThumbnail;
		this.roomPeopleInfo = roomPeopleInfo;
		this.roomPeopleMax = roomPeopleMax;
		this.roomCheckinTime = roomCheckinTime;
		this.roomCheckoutTime = roomCheckoutTime;
		this.roomPrice = roomPrice;
		this.roomDiscount = roomDiscount;
		this.discountPrice = discountPrice;
		this.availableRooms = availableRooms;
	}
	
	

}
