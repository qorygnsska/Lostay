package com.lostay.backend.payment.dto;

import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

	private Long pay_no;				// 결제넘버
	
	private Long user_no;				// 회원넘버
	
	private String pay_type;		// 결제 수단
	private LocalDateTime pay_day;		// 결제날짜
	private String pay_status;			// 결제상태
	private int pay_price;				// 결제가격
	private int pay_point;				// 사용한포인트
}
