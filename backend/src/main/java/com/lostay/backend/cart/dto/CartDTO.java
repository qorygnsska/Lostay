package com.lostay.backend.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

	private Long cartNo;		// 찜넘버
	 
	private Long userNo;		// 회원넘버
	private Long hotelNo; 		// 호텔넘버
}
