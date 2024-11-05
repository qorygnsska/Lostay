package com.lostay.backend.room.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.room.dto.RoomCheckDTO;
import com.lostay.backend.room.service.RoomService;

import lombok.Synchronized;

@RestController
@CrossOrigin
@RequestMapping("/room")
public class RoomRestController {

	@Autowired
	private RoomService roomSer;

	// 해당 호텔의 객실 전부 조회 / 호텔 정보도 가져오기 / 기준인원

	@GetMapping("/HotelRoomList")//변경전: /HotelRoomList 변경후:/room/HotelRoomList
	public ResponseEntity<?> hotelroomlist(@RequestParam(defaultValue = "1") Long hotelNo
										 ,@RequestParam(defaultValue = "2024-10-20T15:00:00") 
										  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkInDate
										 ,@RequestParam(defaultValue = "2024-10-22T11:00:00") 
	   									  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOutDate
	   									 ,@RequestParam(defaultValue = "3") int peopleMax){
		
		
		return new ResponseEntity<>(roomSer.findHotelRoomList(hotelNo,checkInDate,checkOutDate,peopleMax),HttpStatus.OK);

	}

	// 해당 객실에 대한 정보 조회

	@GetMapping("/RoomDetail")//변경전: /RoomDetail 변경후:/room/RoomDetail
	public ResponseEntity<?> roomdetail(@RequestParam(defaultValue = "1") Long roomNo,
			@RequestParam(defaultValue = "2024-11-30T15:00:00") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkInDate,
			@RequestParam(defaultValue = "2024-12-06T11:00:00") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOutDate,
			@RequestParam(defaultValue = "3") int peopleMax) {

		return new ResponseEntity<>(roomSer.findRoomInfo(roomNo, checkInDate, checkOutDate, peopleMax), HttpStatus.OK);

	}
	// 디비 락
	// 예약자가 비슷한 시간에 예약을 하려 할 때 먼저 들어온 사람이 있으면
	// 후에 들어오는 사람을 막는 메소드
	@Synchronized
	@PostMapping("/Reservation")
	public ResponseEntity<?> reservationsyncronized(@RequestBody RoomCheckDTO dto) {

		Long count = roomSer.findAvailableCount(dto);
		int RedisHumanCount = roomSer.findRedisHumanCount(dto);
		JSONObject Body = new JSONObject();
		
		System.out.println("이용 가능한 객실 : " + count);
		System.out.println("레디스에 들어와있는 인원수 : " + RedisHumanCount);
		System.out.println("체크인" +dto.getCheckInDay());
		System.out.println("체크아웃" + dto.getCheckOutDay());
		
		if (count < RedisHumanCount) {
			System.out.println("예약마감");
		
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}else {
			
			Long roomNo = dto.getRoomNo();
			LocalDate in = dto.getCheckInDay();
			LocalDate out = dto.getCheckOutDay();
			
			RoomCheckDTO roomdto = new RoomCheckDTO();
			
			
				roomdto = roomSer.RedisSave(roomNo, in, out);
				System.out.println(roomdto);
				System.out.println("예약가능");
			
				return new ResponseEntity<>(roomdto.getRid(), HttpStatus.OK);

			}

				
	}

}
