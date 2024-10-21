package com.lostay.backend.reservation.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.room.entity.Room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reservation {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name="reservation_no")
	    private Long reservationNo; // 예약넘버

	    @JoinColumn(name = "pay_no", nullable = false) // 결제번호 외래키
	    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    @JsonBackReference // Reservation에서 Payment 방향
	    private Payment payment;

	    @Column(name="res_status")
		private String resStatus;	// 예약 확인/취소 상태
	    
	    @Column(name="check_in")
	    private LocalDateTime checkIn; // 체크인날짜
	    @Column(name="check_out")
	    private LocalDateTime checkOut; // 체크아웃날짜
	
}
