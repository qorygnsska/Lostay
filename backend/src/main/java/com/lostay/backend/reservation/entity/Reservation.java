package com.lostay.backend.reservation.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.lostay.backend.cart.entity.Cart;
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
	    private Long reservation_no; // 예약넘버

	    @JoinColumn(name = "pay_no", nullable = false) // 결제번호 외래키
	    @OneToOne(cascade = CascadeType.ALL)
	    private Payment payment;

	    private LocalDateTime check_in; // 체크인날짜
	    private LocalDateTime check_out; // 체크아웃날짜
	
}
