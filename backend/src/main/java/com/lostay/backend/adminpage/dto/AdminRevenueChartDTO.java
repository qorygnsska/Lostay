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
	private int	branch; //분기별
	
	public AdminRevenueChartDTO(String month, int year, int totalCommission, int totalReservations) {
		super();
		this.month = month;
		this.year = year;
		this.totalCommission = totalCommission;
		this.totalReservations = totalReservations;
	}

	public AdminRevenueChartDTO(int year, int totalCommission, int totalReservations) {
		super();
		this.year = year;
		this.totalCommission = totalCommission;
		this.totalReservations = totalReservations;
	}

	public AdminRevenueChartDTO(int year, int totalCommission, int totalReservations, int branch) {
		super();
		this.year = year;
		this.totalCommission = totalCommission;
		this.totalReservations = totalReservations;
		this.branch = branch;
	}

	
	
}
