package com.lostay.backend.hotel.entity;

import java.util.Set;

import javax.persistence.*;

import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.room.entity.Room;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Hotel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hotel_no;				// 호텔넘버
	
	private String hotel_name;			// 호텔명
	private String hotel_thumbnail;  	// 호텔썸네일
	@Lob
	private String hotel_image;			// 호텔이미지
	private String hotel_amenities;     // 호텔서비스/시설
	private String hotel_rating;		// 호텔등급
	private String hotel_adress;		// 호텔주소
	private String hotel_tourist_attraction;	// 호텔관광명소
	@Lob
	private String hotel_introduction;			// 호텔소개

	@ManyToMany(mappedBy = "hotels") // Cart 엔티티와의 관계 설정
    private Set<Cart> carts;           // 카트 목록
	
	@OneToMany(mappedBy = "hotel") // Room 엔티티와의 관계 설정
	private Set<Room> rooms; // 카트 목록
	
}
