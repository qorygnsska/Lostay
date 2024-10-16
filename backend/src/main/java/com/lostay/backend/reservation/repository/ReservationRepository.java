package com.lostay.backend.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{

	// 결제 취소 시 reservation 테이블에서 payNo외래키 통해서 데이터 찾기
	Optional<Reservation> findByPayment_PayNo(long payNo);


}
