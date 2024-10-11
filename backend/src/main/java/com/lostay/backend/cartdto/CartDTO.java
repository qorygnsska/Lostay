package com.lostay.backend.cartdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

	private Long cart_no;		// 찜넘버
	 
	private Long user_no;		// 회원넘버
	private Long hotel_no; 		// 호텔넘버
}
