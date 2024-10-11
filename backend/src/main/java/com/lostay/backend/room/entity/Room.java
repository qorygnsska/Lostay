package com.lostay.backend.room.entity;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.reservation.entity.Reservation;
import com.lostay.backend.review.entity.Review;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Room {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long room_no;   					// 객실넘버	
	
	@JoinColumn(name = "hotel_no", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL)
	private Hotel hotel;					// 호텔넘버 외래키
	private String room_name;					// 객실명
	private int room_people_max;				// 객실인원(최대수) - 검색 시
	private String room_people_info;			// 객실인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	private int room_count;						// 객실 수
	private String room_thumbnail;				// 객실썸네일
	@Lob
	private String room_img;					// 객실이미지
	private int room_price;						// 객실가격
	private int room_discount;					// 객실할인율
	private String room_amenities;				// 객실편의시설
	private String room_introduction;			// 객실소개(정보)
	private Time room_checkin_time;	// 객실체크인시간
	private Time room_checkout_time;	// 객실체크아웃시간
	
	@OneToOne(mappedBy = "room", cascade = CascadeType.ALL) // room 엔티티와의 관계 설정
	private Payment payments; // 예약 목록
	
	@OneToMany(mappedBy = "room") // room 엔티티와의 관계 설정
	private Set<Review> reviews; // 리뷰 목록
}
