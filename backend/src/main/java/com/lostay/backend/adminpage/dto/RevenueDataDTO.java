package com.lostay.backend.adminpage.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RevenueDataDTO {
    private Long hotelNo;
    private List<QuarterlyRevenueDTO> revenueData;
}