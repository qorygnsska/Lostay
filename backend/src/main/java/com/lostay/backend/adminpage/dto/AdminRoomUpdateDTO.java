package com.lostay.backend.adminpage.dto;

import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRoomUpdateDTO {
	
	private Long roomNo;   						// 객실 넘버	
	private String roomName;					// 객실 명
	private int roomPeopleMax;					// 객실 인원(최대수) - 검색 시
	private String roomPeopleInfo;				// 객실 인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	private int roomCount;						// 객실 수
	private String roomThumbnail;				// 객실 썸네일
	
	private int roomPrice;						// 객실 가격
	private int roomDiscount;					// 객실 할인율
	private List<String> roomIntroductionList;	// 객실 소개(정보)		
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime roomCheckinTime;			// 객실 체크인시간
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime roomCheckoutTime;			// 객실 체크아웃시간
	
	private String roomDelThumbnail;			// 객실 삭제할 썸네일
	private List<String> roomDelImages;			// 객실 삭제할 이미지
	private List<String> roomAmenities;			// 객실 편의시설

}
