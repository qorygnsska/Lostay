package com.lostay.backend.point.dto;

import java.time.LocalDateTime;

import com.lostay.backend.payment.dto.PaymentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointDTO {

	private Long pointNo;				// 포인트넘버
	
	private Long userNo;				// 회원넘버(포인트) 외래키
	
	private LocalDateTime pointDay;	// 포인트(적립,사용)날짜
	private int pointPlusMinus;		// 포인트증감

}
