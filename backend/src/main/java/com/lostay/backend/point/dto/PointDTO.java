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

	private Long point_no;				// 포인트넘버
	
	private Long user_no;				// 회원넘버(포인트) 외래키
	
	private LocalDateTime point_day;	// 포인트(적립,사용)날짜
	private int point_plus_minus;		// 포인트증감

}
