package com.lostay.backend.refresh_token.dto;

import java.time.LocalDateTime;

import com.lostay.backend.payment.dto.PaymentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDTO {

	private Long rtNo;		// 토큰넘버
	
	private Long userNo;	// 회원넘버 외래키
	private int rtToken;	// 리프레쉬토큰
}
