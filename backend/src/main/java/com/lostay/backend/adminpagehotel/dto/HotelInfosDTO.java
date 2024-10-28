package com.lostay.backend.adminpagehotel.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelInfosDTO {

	

	private Long hotelNo;				// 호텔넘버
	private String hotelName;			// 호텔명
	private String hotelRating;		    // 호텔등급
	private String hotelAdress;		    // 호텔주소
	private int hotelCommission; 		//호텔 중개료
	private int totalroomsCount; 	//객실 종류 객실개수 총합
	
	private List<roomsDTO> rooms;
	
}
