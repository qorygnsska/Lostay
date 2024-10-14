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

private Long reservationNo;		// 예약넘버
	
	private Long roomNo;				// 객실넘버 외래키
	private Long pay_no;				// 결제넘버 외래키
	private LocalDateTime checkIn;		// 체크인날짜
	private LocalDateTime checkOut;	// 체크아웃날짜
	
}
