package com.lostay.backend.room.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;

@Controller	
public class RoomController {

//	@Autowired
//	private RoomReopository rr;
//	
//	@GetMapping("/roomhotelJoin")
//	public String roomhotelJoin() {
//	
//	Long hotelNo = 1L;
//		
//	List<Room> rooms = rr.findByHotel_HotelNo(hotelNo);
//	List<RoomDTO> RoomList = new ArrayList<RoomDTO>();
//	System.out.println("여기에 hotel = 1 인 객실 출력");
//	for(Room s : rooms) {
//		RoomDTO dto = new RoomDTO();
//		dto.setHotelName(s.getHotel().getHotelName());
//		dto.setRoomNo(s.getRoomNo());
//		dto.setRoomName(s.getRoomName());
//		
//		RoomList.add(dto);
//		
//	}
//	
//	for(RoomDTO d : RoomList) {
//		System.out.println(d);
//	}
//		
//		return "<h1>suceess</h1>";
//	}
}
