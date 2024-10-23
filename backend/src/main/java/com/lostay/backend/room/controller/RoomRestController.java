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

import com.lostay.backend.room.service.RoomService;

@RestController
public class RoomRestController {

	
	@Autowired
	private RoomService roomSer;
	
	
	// 해당 호텔의 객실 전부 조회 / 호텔 정보도 가져오기 / 기준인원
	@GetMapping("/HotelRoomList")
	public ResponseEntity<?> hotelroomlist(@RequestParam(defaultValue = "1") long hotelNo
										 ,@RequestParam(defaultValue = "2024-10-20T15:00:00") 
										  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkInDate
										 ,@RequestParam(defaultValue = "2024-10-22T11:00:00") 
	   									  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOutDate
	   									 ,@RequestParam(defaultValue = "3") int peopleMax){
		
		
		return new ResponseEntity<>(roomSer.findHotelRoomList(hotelNo,checkInDate,checkOutDate,peopleMax),HttpStatus.OK);
	}
	

	// 해당 객실에 대한 정보 조회
	@GetMapping("/RoomDetail")
	public ResponseEntity<?> roomdetail(@RequestParam(defaultValue = "1") long roomNo){
		
		
		return new ResponseEntity<>(roomSer.findRoomInfo(roomNo),HttpStatus.OK);
	}
	
	
}
