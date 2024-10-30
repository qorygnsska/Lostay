package com.lostay.backend.room.dto;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
	private String[] roomAmenities;				// 객실편의시설
	private String[] roomIntroduction;			// 객실소개(정보)
	private LocalTime roomCheckinTime;	// 객실체크인시간
	private LocalTime roomCheckoutTime;	// 객실체크아웃시간
	
	// 추가
	private LocalDate roomCheckIn;	// 입실날짜
	private LocalDate roomCheckOut; // 퇴실날짜
	
	// 외래키
	@NonNull
	private String hotelName;
	private String hotelRating;   // 호텔성급
	private double reviewAvg;	// 별점 평균
	private int totalReviewCount;	// 리뷰 총 개수
	private String hotelThumbnail;  // 호텔썸네일
	private String[] hotelImg;      // 호텔이미지
	private String[] hotelAmenities;   // 호텔서비스/시설
	private String hotelIntroduction;  // 호텔 소개
	private String hotelAdress;  		// 호텔 주소
	private String hotelTouristAttraction;	// 호텔관광명소
	private long availableRooms;            // 남은 방 개수
	private int discountPrice;              // 할인된 금액
	
	// 검색창에 적혀있는 칼럼들
	private LocalDate checkInDay;         // 체크인 날짜 
	private LocalDate checkOutDay;		  // 체크아웃 날짜
	private Long period;					 // 몇박인지
	private int searchPeople;           // 검색 시 인원 몇명인지
}
