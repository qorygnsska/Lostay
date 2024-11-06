package com.lostay.backend.hotel.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.elasticsearch.service.EsService;
import com.lostay.backend.hotel.service.HotelService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/hotel")
public class HotelController {

	@Autowired
	private HotelService hotelService;

	@Autowired
	private EsService ess;

	@GetMapping("/search") // 변경전: /testhotel 변경후:/hotel/search
	public ResponseEntity<?> testhotel(@RequestParam(defaultValue = "서울") String hotelsearch // 검색어
			, @RequestParam(defaultValue = "2024-10-20") String checkIn // 체크인
			, @RequestParam(defaultValue = "2024-10-22") String checkOut // 체크아웃
			, @RequestParam(defaultValue = "2") int roomPeopleInfo // 투숙인원
			, @RequestParam(defaultValue = "0") Integer minRoomPrice // 객실 최소가격
			, @RequestParam(defaultValue = "1000000") Integer maxRoomPrice // 객실 최대가격
			, @RequestParam(defaultValue = "0") int soldOut // 매진제외 0:전체보기
			, @RequestParam(defaultValue = "0") int roomDiscountState // 할인혜택 0:전체보기
			, @RequestParam(required = false) String[] hotelRating // 등급
			, @RequestParam(required = false) String[] hotelAmenities // 시설&서비스
			, @RequestParam(required = false) String sort) { // 정렬 방식

		// Elasticserach로 입력어를 토큰화 : filteredSearch(List)
		List<String> filteredSearch = ess.searchToken(hotelsearch);
		String[] tokenArr = filteredSearch.toArray(new String[filteredSearch.size()]);


		log.info("입력: " + hotelsearch);
		log.info("검색: " + filteredSearch);
		log.info("체크인: " + checkIn);
		log.info("체크아웃: " + checkOut);
		log.info("기준인원: " + roomPeopleInfo);
		log.info("객실 최소가격: " + minRoomPrice);
		log.info("객실 최대가격: " + maxRoomPrice);
		log.info("매진숙소: " + soldOut);
		log.info("할인혜택: " + roomDiscountState);
		log.info("등급: " + Arrays.toString(hotelRating));
		log.info("시설: " + Arrays.toString(hotelAmenities));
		log.info("정렬: " + sort);
		// 호텔 서비스 호출
		return new ResponseEntity<>(hotelService.findHotelsFilter(hotelAmenities, tokenArr, minRoomPrice,
				maxRoomPrice, checkIn, checkOut, roomPeopleInfo, soldOut, roomDiscountState, hotelRating, sort),
				HttpStatus.OK);
	}
}
