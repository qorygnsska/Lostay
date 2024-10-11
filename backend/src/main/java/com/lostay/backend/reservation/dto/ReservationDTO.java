package com.lostay.backend.reservation.dto;

import java.time.LocalDateTime;

import com.lostay.backend.hotel.dto.HotelDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {

private Long reservation_no;		// 예약넘버
	
	private Long room_no;				// 객실넘버 외래키
	private Long pay_no;				// 결제넘버 외래키
	private LocalDateTime check_in;		// 체크인날짜
	private LocalDateTime check_out;	// 체크아웃날짜
	
}
