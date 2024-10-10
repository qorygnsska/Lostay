package com.lostay.backend.reservation.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.room.entity.Room;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reservation_no;		// 예약넘버
	
	@JoinColumn(name = "room_no", nullable = false)
	@ManyToMany(cascade = CascadeType.ALL)
	private Room room;			// 객실넘버 외래키
	
	@JoinColumn(name = "pay_no", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL)
	private Payment payment;				// 결제넘버 외래키
	
	
	private LocalDateTime check_in;		// 체크인날짜
	private LocalDateTime check_out;	// 체크아웃날짜
	
	
}
