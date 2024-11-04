package com.lostay.backend.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.main.service.MainService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/main")
public class MainController {

	@Autowired
	private MainService mainService;
	
	
	//국내 인기여행지 조회
	@GetMapping("/location") //변경전: /locationMain 변경후:/main/location
	public ResponseEntity<?>locationMain(){
		log.info("locationMaint실행");
		return new ResponseEntity<>(mainService.locationFindAll(),HttpStatus.OK);
	}
	//이벤트 조회
	@GetMapping("/event")//변경전: /eventMain 변경후:/main/event
	public ResponseEntity<?>eventMain(){
		log.info("locationMaint실행");
		return new ResponseEntity<>(mainService.eventOnGoing(),HttpStatus.OK);
	}
	//특가 호텔 조회
	@GetMapping("/discountHotel")//변경전: /discountHotelMain 변경후:/main/discountHotel
	public ResponseEntity<?>discountHotelMain(){
		log.info("discountHotelMain실행");
		return new ResponseEntity<>(mainService.findTop10HtolesDiscount(),HttpStatus.OK);

	}
	//인기 호텔 조회
	@GetMapping("/hotHotels")//변경전: /hotHotelsMain 변경후:/main/hotHotels
	public ResponseEntity<?>hotHotlesMain(){
		log.info("hotHotlesMain실행");
		return new ResponseEntity<>(mainService.findTop10HtolesRating(),HttpStatus.OK);

	}
	//여행지별 숙소
    @GetMapping("/triphotels")//변경전: /triphotelsMain 변경후:/main/triphotels
    public ResponseEntity<?>triphotlesMain(){
		log.info("triphotlesMain실행");
		return new ResponseEntity<>(mainService.findByHotelAddressContaining(),HttpStatus.OK);

	}
    
}
	
