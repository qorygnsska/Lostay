package com.lostay.backend.adminpage.dto;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.lostay.backend.hotel.entity.Hotel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomsInfosDTO {
	private Long roomNo;   						// 객실넘버	
	
	private String roomName;					// 객실명
	private int roomPeopleMax;					// 객실인원(최대수) - 검색 시
	private String roomPeopleInfo;				// 객실인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	private int roomCount;						// 객실 수
	private String roomThumbnail;				// 객실썸네일
	
	private String roomImg;						// 객실이미지
	private int roomPrice;						// 객실가격
	private int roomDiscount;					// 객실할인율
	private String roomAmenities;				// 객실편의시설
	private String roomIntroduction;			// 객실소개(정보)
	private LocalTime roomCheckinTime;			// 객실체크인시간
	private LocalTime roomCheckoutTime;			// 객실체크아웃시간
	
	private List<String> roomIntroductionList;	// 객실 소개들
	private List<String> roomImageList;			// 객실 이미지들
	private List<String> roomAmenitiesList;		// 객실 편의시설들
	
	public RoomsInfosDTO(Long roomNo, String roomName, int roomPeopleMax, String roomPeopleInfo,
			int roomCount, String roomThumbnail, String roomImg, int roomPrice, int roomDiscount, String roomAmenities,
			String roomIntroduction, LocalTime roomCheckinTime, LocalTime roomCheckoutTime) {

		this.roomNo = roomNo;
		this.roomName = roomName;
		this.roomPeopleMax = roomPeopleMax;
		this.roomPeopleInfo = roomPeopleInfo;
		this.roomCount = roomCount;
		this.roomThumbnail = roomThumbnail;
		this.roomImg = roomImg;
		this.roomPrice = roomPrice;
		this.roomDiscount = roomDiscount;
		this.roomAmenities = roomAmenities;
		this.roomIntroduction = roomIntroduction;
		this.roomCheckinTime = roomCheckinTime;
		this.roomCheckoutTime = roomCheckoutTime;
	}
	
	
}
