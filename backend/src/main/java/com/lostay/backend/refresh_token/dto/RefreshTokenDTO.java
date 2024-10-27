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

	private String userProviderId;
	private String refreshToken;
}
