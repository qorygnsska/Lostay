package com.lostay.backend.review.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelReviewsDTO {

	
	private HotelInfoDTO hotelInfo;
	private List<ReviewsDTO> reviews ;
}
