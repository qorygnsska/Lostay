package com.lostay.backend.payment.entity;

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
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name="pay_no")
	    private Long payNo; // 결제넘버

	    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_no", nullable = false)
	    private User user; // 회원넘버
	    
	    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    @JoinColumn(name = "room_no", nullable = false)
	    private Room room; // 객실넘버

	    @Column(name="pay_type")
	    private String payType; // 결제 수단
	    @Column(name="pay_day")
	    private LocalDateTime payDay; // 결제날짜
	    @Column(name="pay_status")
	    private String payStatus; // 결제상태
	    @Column(name="pay_price")
	    private int payPrice; // 결제가격
	    @Column(name="pay_point")
	    private int payPoint; // 사용한포인트
	    @Column(name="cancle_day")
	    private LocalDateTime cancleDay;  // 결제 취소 날짜
	   
	    
	    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // 예약 엔티티와의 관계 설정
	    @ToString.Exclude
	    private Reservation reservations; // 예약 목록
}
