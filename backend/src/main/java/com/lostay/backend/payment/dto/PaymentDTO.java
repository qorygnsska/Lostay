package com.lostay.backend.payment.dto;

import java.time.LocalDateTime;


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
	
	
	// 조인컬럼
	private String hotelName;  // 호텔이름
	private String hotelAddress;  // 호텔주고
	private LocalDateTime checkIn;  // 체크인 날짜
	private LocalDateTime checkOut;  // 체크아웃 날짜
	private String userName;		// 유저명
	private String userPhone;		// 유저폰번호
}

