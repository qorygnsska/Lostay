package com.lostay.backend.payment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	//관리자 페이지 매출액(중계료) 년도별(jh)
	@Query("SELECT p FROM Payment p WHERE p.payStatus = 'Y'")
	List<Payment> findAllSuccessfulPayments();

	//관리자 페이지 매출액(중계료) 월별(jh)
	@Query("SELECT p FROM Payment p WHERE p.payStatus = 'Y' AND YEAR(p.payDay) = :year")
	List<Payment> findSuccessfulPaymentsByYear(@Param("year") int year);

	// 관리자 페이지 매출액(중계료) 분기별(jh)
	@Query("SELECT p FROM Payment p WHERE p.payStatus = 'Y' AND YEAR(p.payDay) = :year AND QUARTER(p.payDay) = :quarter")
	List<Payment> findSuccessfulPaymentsByQuarter(@Param("year") int year, @Param("quarter") int quarter);

}
