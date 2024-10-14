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
import javax.persistence.OneToOne;

import com.lostay.backend.reservation.entity.Reservation;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long payNo; // 결제넘버

	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "userNo", nullable = false)
	    private User user; // 회원넘버
	    
	    @OneToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "roomNo", nullable = false)
	    private Room room; // 객실넘버

	    private String payType; // 결제 수단
	    private LocalDateTime payDay; // 결제날짜
	    private String payStatus; // 결제상태
	    private int payPrice; // 결제가격
	    private int payPoint; // 사용한포인트

	    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL) // 예약 엔티티와의 관계 설정
	    private Reservation reservations; // 예약 목록
}