package com.lostay.backend.reservation.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookHistoryDTO {
		
	// 예약
	private Long reservationNo; 		// 예약 넘버
    
    // 결제
    private Long payNo;					// 결제 넘버
	
	// 객실
    private Long roomNo;				// 객실넘버	
    private String roomName;           	// 객실명
    private String roomCheckinTime; 	// 객실 체크인 시간
    private String roomCheckoutTime; 	// 객실 체크아웃 시간
   					
	// 호텔
    private Long hotelNo;              	// 호텔 넘버
    private String hotelName;			// 호텔 이름
    private String hotelThumbnail;  	// 호텔 썸네일
    
	// Custom
    private Boolean isRoomCancle;		// 객실 취소 가능 여부 (Y 가능, N 불가능)
    private Boolean isWriteReview;		// 리뷰 작성 여부
    private Boolean isPayCancel;		// 예약 취소 (true)
	private String nights;				// 몇박
    private String payDay;				// 결제 날짜
	private String checkInDate;     	// 체크인 날짜
    private String checkOutDate;    	// 체크아웃 날짜
    private String checkInDayOfWeek;	// 체크인 요일
    private String checkOutDayOfWeek;	// 체크아웃 요일
}
