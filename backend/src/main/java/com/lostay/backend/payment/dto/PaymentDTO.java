package com.lostay.backend.payment.dto;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

	private Long payNo;				// 결제넘버
	
	private Long userNo;				// 회원넘버
	
	private String payType;		// 결제 수단
	private LocalDateTime payDay;		// 결제날짜
	private String payStatus;			// 결제상태
	private int payPrice;				// 결제가격
	private int payPoint;				// 사용한포인트
    private LocalDateTime cancleDay;  // 결제 취소 날짜   
	
	// 조인컬럼
    private long hotelNo; 		// 호텔이름
	private String hotelName;  // 호텔이름
	private String hotelAddress;  // 호텔주고
	private LocalDateTime checkIn;  // 체크인 날짜
	private LocalDateTime checkOut;  // 체크아웃 날짜
	private String userName;		// 유저명
	private String userPhone;		// 유저폰번호
	private int roomPrice;			// 객실가격
	private long roomNo;			// 객실번호
	private String roomName;		// 객실명
	private LocalTime roomCheckinTime;	// 객실체크인시간
	private LocalTime roomCheckoutTime;	// 객실체크아웃시간
	private int period;         // 몇박인지 확인하는
	private String cancleAble;   // 예약 취소 가능한지 아닌지
	private String reviewAble;    // 리뷰 가능한지 아닌지
	private String roomThumbnail;	// 객실 썸네일 이미지
	private String hotelThumbnail;  // 호텔 썸네일 이미지
	private int status;      // 적립인지 사용인지 판단하는 컬럼 
							//  0이면 적립, 1이면 사용
	

}

