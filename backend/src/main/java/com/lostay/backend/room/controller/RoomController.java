package com.lostay.backend.room.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomReopository;

@Controller	
public class RoomController {

	@Autowired
	private RoomReopository rr;
	
	@GetMapping("/roomhotelJoin")
	public String roomhotelJoin() {
		
		Long hotel_no = 1L;
		
	
		
		 
//		List<Room> rooms = rr.findByHotel_Room(hotel_no);
		
		System.out.println("rooms 여기 출력 --------------------------------");
		System.out.println( rr.findByHotel_Room(hotel_no));
	
		
		return "<h1>suceess</h1>";
	}
}
