package com.lostay.backend.adminpage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuarterlyRevenueDTO {
    private int year;
    private int quarter;
    private long totalCommission;
    private long totalReservations;
}