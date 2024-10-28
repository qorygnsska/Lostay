package com.lostay.backend.refresh_token.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRefreshTokenDTO {
	private String adminId;
	private String refreshToken;
}
