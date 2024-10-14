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
}
