package com.lostay.backend.location.dto;

import com.lostay.backend.hotel.dto.HotelDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationDTO {

	private Long locationNo;
	
	private String locationName;
	private String locationImage;
	
}
