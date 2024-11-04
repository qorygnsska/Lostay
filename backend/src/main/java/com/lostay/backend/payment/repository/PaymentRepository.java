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

	// 관리자 페이지 호텔별 분기 조회
	@Query("SELECT " +
		       "YEAR(p.payDay) AS year, " +
		       "QUARTER(p.payDay) AS quarter, " +
		       "SUM(ROUND(p.payPrice * h.hotelCommission / 100)) AS totalCommission, " +
		       "COUNT(p) AS totalReservations " + // COUNT를 p로 수정
		       "FROM Hotel h " +
		       "JOIN h.rooms r " + // Join 방식 변경
		       "JOIN r.payments p " + // Join 방식 변경
		       "WHERE p.payStatus = 'Y' " +
		       "AND YEAR(p.payDay) = :year " +
		       "AND h.hotelNo = :hotelNo " +
		       "GROUP BY YEAR(p.payDay), QUARTER(p.payDay)")
	List<Object[]> findRevenueDataByHotelNo(@Param("hotelNo") Long hotelNo,@Param("year") int year);

}
