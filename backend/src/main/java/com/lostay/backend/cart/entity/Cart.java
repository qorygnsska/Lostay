package com.lostay.backend.cart.entity;

import javax.persistence.*;

import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cart_no;		// 찜넘버
	 
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_no", nullable = false) // 외래키 설
	private User user;	// 회원넘버
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "hotel_no", nullable = false) // 외래키 설
	private Hotel hotel; 		// 호텔넘버
}
