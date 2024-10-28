package com.lostay.backend.room.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomListDTO {

	private RoomListHotelInfoDTO dto;
	private LocalDate checkInDay;         // 체크인 날짜 
	private LocalDate checkOutDay;		  // 체크아웃 날짜
	private int period;					 // 몇박인지
	private List<RoomCustomDTO> list;     // 객실정보 배열
	

}
