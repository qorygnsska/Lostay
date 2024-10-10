package com.lostay.backend.payment.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.lostay.backend.reservation.entity.Reservation;
import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pay_no;				// 결제넘버
	
	@JoinColumn(name = "user_no", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL)
	private User user;				// 회원넘버
	
	private LocalDateTime pay_day;		// 결제날짜
	private String pay_status;			// 결제상태
	private int pay_price;				// 결제가격
	private int pay_point;				// 사용한포인트
		
	@OneToMany(mappedBy = "payment") // room 엔티티와의 관계 설정
	private Set<Reservation> reservations; // 리뷰 목록
}
