package com.lostay.backend.cart.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {


	private Long cartNo;
	private Long userNo; // 사용자 번호
	private Set<Long> hotelNos; // 호텔 번호 목록
	
	public CartDTO(Long cartNo) {
		this.cartNo = cartNo;
	}
}
