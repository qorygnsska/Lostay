package com.lostay.backend.payment.entity;

import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(name = "pay_no")
    private Long payNo; // 결제 넘버

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_no", nullable = false)
    @JsonBackReference // Payment에서 User 방향
    private User user; // 회원 넘버

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // LAZY 로딩으로 수정
    @JoinColumn(name = "room_no", nullable = false)
    private Room room; // 객실 넘버

    @Column(name = "pay_type")
    private String payType; // 결제 수단
    @Column(name = "pay_day")
    private LocalDateTime payDay; // 결제 날짜
    @Column(name = "pay_status")
    private String payStatus; // 결제 상태
    @Column(name = "pay_price")
    private int payPrice; // 결제 가격
    @Column(name = "pay_point")
    private int payPoint; // 사용한 포인트
    @Column(name = "cancle_day")
    private LocalDateTime cancleDay; // 결제 취소 날짜
    @Column(name = "imp_uid")
    private String impUid;		// 결제 고유 id

    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // LAZY 로딩으로 수정
    @ToString.Exclude
    @JsonBackReference // Reservation에서 Payment 방향
    private Reservation reservations; // 예약 목록

    // equals 및 hashCode 메소드 추가
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Payment payment = (Payment) o;
        return payNo != null && payNo.equals(payment.payNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(payNo);
    }
}
