package com.lostay.backend.adminpagehotel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class roomsDTO {
	
	
	private Long roomNo;
	private String roomName;
	private int roomCount;
	private int roomPrice;
	private int roomDiscount;
	

	
}
