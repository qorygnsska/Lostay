package com.lostay.backend.refresh_token.dto;

import java.time.LocalDateTime;

import com.lostay.backend.payment.dto.PaymentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Refresh_TokenDTO {

	private Long rt_no;		// 토큰넘버
	
	private Long user_no;	// 회원넘버 외래키
	private int rt_token;	// 리프레쉬토큰
}
