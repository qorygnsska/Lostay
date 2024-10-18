package com.lostay.backend.hotel.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.hotel.service.HotelService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@CrossOrigin
public class HotelController {

	@Autowired
	private HotelService hotelService;

//	@GetMapping("/hotelList")
//	public String hotelList() {
//		
//		List<Hotel> hotels = hr.findAll();
//		
////		System.out.println("여기 호텔리스트 출력");
////		System.out.println(hotels);
//	     List<HotelDTO> hotelDTOList = new ArrayList<>();
//
//	        for (Hotel hotel : hotels) {
//	            HotelDTO hotelDTO = new HotelDTO();
//	            hotelDTO.setHotelNo(hotel.getHotelNo());
//	            hotelDTO.setHotelName(hotel.getHotelName());
//	            hotelDTO.setHotelThumbnail(hotel.getHotelThumbnail());
//	            hotelDTO.setHotelImage(hotel.getHotelImage().split(",")); // assuming images are stored as comma-separated
//	            hotelDTO.setHotelAmenities(hotel.getHotelAmenities());
//	            hotelDTO.setHotelRating(hotel.getHotelRating());
//	            hotelDTO.setHotelAdress(hotel.getHotelAdress());
//	            hotelDTO.setHotelTouristAttraction(hotel.getHotelTouristAttraction());
//	            hotelDTO.setHotelIntroduction(hotel.getHotelIntroduction());
//
//	            hotelDTOList.add(hotelDTO);
//	        }
//	        
//	        System.out.println("여기 출력");
//	        	System.out.println(hotelDTOList.get(0).getHotelAdress());
//				
//		return "sucess";
//	}

	// 호텔 검색
//		@GetMapping("/hotelList")
//		public  ResponseEntity<?> hotelList(@RequestParam(defaultValue ="제주도") String hotelAdress     //지역
//							  ,@RequestParam(defaultValue ="2024-10-20") String checkIn  //체크인날짜
//							  ,@RequestParam(defaultValue ="2024-10-22") String checkOut //체크아웃날짜
//							  ,@RequestParam(defaultValue ="기준2인") String roomPeopleInfo //기준인원
//							  ,@RequestParam(defaultValue="0") int minRoomPrice //객실 최소가격
//							  ,@RequestParam(defaultValue="1000000") int maxnRoomPrice//객실 최대가격
//							  ,@RequestParam()String roomDiscount//할인혜택
//							  ,@RequestParam(defaultValue="5성급")String[] hotelRating//등급
//		                      ,@RequestParam()String[] bedtype//베드타입
//		                      ,@RequestParam()String[] facilities1//공용시설
//		                      ,@RequestParam()String[] facilities2//객실 내 시설
//		                      ,@RequestParam()String[] facilities3//기타 시설
//		                      ,@RequestParam(defaultValue="1")int SoldOut //매진 숙소 매진 숙소 버튼을누르면 -1값 기본은 1값
//		                      ,@RequestParam(defaultValue="평점 높은 순") String sort)//정렬
//				{
//				
//				
//			
//			
//			
//				return null;			
//			
//		}

	@GetMapping("/testhotel")
	public ResponseEntity<?> testhotel(
			@RequestParam(defaultValue = "수영장") String amenities
			, @RequestParam(defaultValue = "제주도") String hotelAdress
			, @RequestParam(defaultValue = "2024-10-20") String checkIn // 체크인날짜
			, @RequestParam(defaultValue = "2024-10-22") String checkOut // 체크아웃날짜
			, @RequestParam(defaultValue = "기준2인") String roomPeopleInfo // 기준인원
			, @RequestParam(defaultValue = "0") int minRoomPrice // 객실 최소가격
			, @RequestParam(defaultValue = "1000000") int maxRoomPrice// 객실 최대가격
			,@RequestParam(defaultValue="1")int soldOut //매진 숙소 매진 숙소 버튼을누르면 -1값 기본은 1값
		    ,@RequestParam(defaultValue="")String roomDiscountState//할인혜택
			,@RequestParam(defaultValue="5성급")String[] hotelRating//등급
			,@RequestParam(defaultValue="평점 높은 순") String sort)//정렬
			
	{
		  // 어메니티 문자열을 배열로 변환
	    String[] hotelAmenities = amenities.split(",");

	    log.info(Arrays.toString(hotelAmenities));
	    log.info("호텔 주소: " + hotelAdress);
	    log.info("등급: " + Arrays.toString(hotelRating));

	    // 호텔 서비스 호출
	    return new ResponseEntity<>(hotelService.findHotelsFilter(
                hotelAmenities, hotelAdress, minRoomPrice, maxRoomPrice,
                checkIn, checkOut, roomPeopleInfo, soldOut, hotelRating, sort),
                HttpStatus.OK);
	}

}
