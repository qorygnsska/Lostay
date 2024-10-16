package com.lostay.backend.payment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

	// 예약내역에서 예약한 숙소 출력
	List<Payment> findByUser_UserNoAndPayStatus(long userNo, String payStatus);


}
