package com.lostay.backend.discount.dto;

import com.lostay.backend.hotel.dto.HotelDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiscountDTO {

	private Long dis_no;			// 할인넘버
	
	private String dis_category;	// 결제유형
	private double dis_rate;		// 할인율(pay에 관한 할인)
}
