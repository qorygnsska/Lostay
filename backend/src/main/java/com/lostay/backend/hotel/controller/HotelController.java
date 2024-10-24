package com.lostay.backend.hotel.controller;


import java.util.Arrays;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.lostay.backend.hotel.service.HotelService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@CrossOrigin
@RestController
public class HotelController {

	@Autowired
	private HotelService hotelService;



	@GetMapping("/testhotel")
	public ResponseEntity<?> testhotel(
			@RequestParam(required = false) String amenities
			, @RequestParam(defaultValue = "서울") String hotelsearch
			, @RequestParam(defaultValue = "2024-10-20") String checkIn // 체크인날짜
			, @RequestParam(defaultValue = "2024-10-22") String checkOut // 체크아웃날짜
			, @RequestParam(defaultValue = "2") int roomPeopleInfo // 기준인원
			, @RequestParam(defaultValue="0") Integer minRoomPrice // 객실 최소가격
			, @RequestParam(defaultValue="1000000") Integer maxRoomPrice// 객실 최대가격
			,@RequestParam(defaultValue="1")int soldOut //매진 숙소 매진 숙소 버튼을누르면 0값 기본은 1값
		    ,@RequestParam(defaultValue="0")int roomDiscountState//할인혜택
			,@RequestParam(required = false)String[] hotelRating//등급
			,@RequestParam(required = false) String sort)//정렬
			
	{
		   // 어메니티 문자열을 배열로 변환
	    String[] hotelAmenities = (amenities != null) ? amenities.split(",") : new String[0];

	    if(hotelsearch.equals("제주도")) {
	    	hotelsearch="제주";
	    }
	    
	    log.info(Arrays.toString(hotelAmenities));
	    log.info("호텔 주소: " + hotelsearch);
	    log.info("등급: " + Arrays.toString(hotelRating));
	    log.info("체크인: " + checkIn);
	    log.info("체크아웃날짜: " + checkOut);
	    log.info("기준인원: " + roomPeopleInfo);
	    log.info("객실 최소가격: " + minRoomPrice);
	    log.info("객실 최대가격: " + maxRoomPrice);
	    log.info("매진 숙소: " + soldOut);
	    log.info("할인혜택: " + roomDiscountState);
	    log.info("정렬: " + sort);
	    // 호텔 서비스 호출
	    return new ResponseEntity<>(hotelService.findHotelsFilter(
                hotelAmenities, hotelsearch, minRoomPrice, maxRoomPrice,
                checkIn, checkOut, roomPeopleInfo, soldOut,roomDiscountState, hotelRating, sort),
                HttpStatus.OK);
	}
}
