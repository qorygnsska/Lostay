package com.lostay.backend.reservation.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;

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
	private String resStatus;		// 예약 취소함(N)
	private String resReviewStatus;	// 리뷰 작성함(Y)
	private String name;            // 유저네임
	private String phone;			// 예약자 전화번호
}