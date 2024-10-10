package com.lostay.backend.cartentity;

import javax.persistence.*;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cart_no;		// 찜넘버
	 
	private Long user_no;		// 회원넘버
	private Long hotel_no; 		// 호텔넘버
}
