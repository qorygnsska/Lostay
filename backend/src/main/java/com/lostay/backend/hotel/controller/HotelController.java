package com.lostay.backend.hotel.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;

@Controller
public class HotelController {

	@Autowired
	private HotelRepository hr;
	
	@GetMapping("/hotelList")
	public String hotelList() {
		
		List<Hotel> hotels = hr.findAll();
		
//		System.out.println("여기 호텔리스트 출력");
//		System.out.println(hotels);
	     List<HotelDTO> hotelDTOList = new ArrayList<>();

	        for (Hotel hotel : hotels) {
	            HotelDTO hotelDTO = new HotelDTO();
	            hotelDTO.setHotelNo(hotel.getHotelNo());
	            hotelDTO.setHotelName(hotel.getHotelName());
	            hotelDTO.setHotelThumbnail(hotel.getHotelThumbnail());
	            hotelDTO.setHotelImage(hotel.getHotelImage().split(",")); // assuming images are stored as comma-separated
	            hotelDTO.setHotelAmenities(hotel.getHotelAmenities());
	            hotelDTO.setHotelRating(hotel.getHotelRating());
	            hotelDTO.setHotelAdress(hotel.getHotelAdress());
	            hotelDTO.setHotelTouristAttraction(hotel.getHotelTouristAttraction());
	            hotelDTO.setHotelIntroduction(hotel.getHotelIntroduction());

	            hotelDTOList.add(hotelDTO);
	        }
	        
	        System.out.println("여기 출력");
	        	System.out.println(hotelDTOList.get(0).getHotelAdress());
				
		return "sucess";
	}
}

