package com.lostay.backend.cart.entity;

import java.util.Set;

import javax.persistence.*;

import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartNo;		// 찜넘버
	 
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "userNo", nullable = false) // 외래키 설
	private User user;	// 회원넘버
	
	
	@ManyToMany(cascade = CascadeType.ALL)
	 @JoinTable(
		        name = "cartHotel", // 중간 테이블 이름
		        joinColumns = @JoinColumn(name = "cartNo"), // Cart의 외래키
		        inverseJoinColumns = @JoinColumn(name = "hotelNo") // Hotel의 외래키
		    ) // 외래키 설
	 private Set<Hotel> hotels;  		// 호텔넘버
}
