package com.lostay.backend.room.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomRestController {

	
	@Autowired
	private RoomService roomSer;
	
	
	// 해당 호텔의 객실 전부 조회 / 호텔 정보도 가져오기
	@GetMapping("/HotelRoomAll")
	public ResponseEntity<?> hotelroomall(@RequestParam(defaultValue = "1") long hotelNo
										 ,@RequestParam(defaultValue = "2024-10-20") 
										  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime checkInDate
										 ,@RequestParam(defaultValue = "2024-10-22") 
	   									  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime checkOutDate){
		
		
		return new ResponseEntity<>(roomSer.findHotelRoomAll(hotelNo,checkInDate,checkOutDate),HttpStatus.OK);
	}
	

	
}
