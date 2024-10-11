package com.lostay.backend.cart.entity;

import java.util.Set;

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
	
	
	@ManyToMany(cascade = CascadeType.ALL)
	 @JoinTable(
		        name = "cart_hotel", // 중간 테이블 이름
		        joinColumns = @JoinColumn(name = "cart_no"), // Cart의 외래키
		        inverseJoinColumns = @JoinColumn(name = "hotel_no") // Hotel의 외래키
		    ) // 외래키 설
	 private Set<Hotel> hotels;  		// 호텔넘버
}
