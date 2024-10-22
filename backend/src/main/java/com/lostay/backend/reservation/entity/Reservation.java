package com.lostay.backend.reservation.entity;

import java.time.LocalDateTime;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.lostay.backend.payment.entity.Payment;

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
    @Column(name = "reservation_no")
    private Long reservationNo; // 예약 넘버

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // LAZY 로딩으로 수정
    @JoinColumn(name = "pay_no", nullable = false) // 결제번호 외래키
    @JsonBackReference // Reservation에서 Payment 방향
    private Payment payment;

    @Column(name = "res_status")
    private String resStatus; // 예약 확인/취소 상태

    @Column(name = "check_in")
    private LocalDateTime checkIn; // 체크인 날짜
    @Column(name = "check_out")
    private LocalDateTime checkOut; // 체크아웃 날짜
}
