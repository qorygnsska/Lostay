package com.lostay.backend.adminpage.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRevenueChartDTO {
	private String month; // 매출액 날짜 (YYYY-MM 형식)
	private int year; // 매출액 날짜 (년도)
	private int totalCommission; // 월별 매출액
	private int totalReservations; // 월별 예약 수

}
