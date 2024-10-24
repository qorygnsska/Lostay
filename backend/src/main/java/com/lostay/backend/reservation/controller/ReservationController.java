package com.lostay.backend.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.reservation.service.ReservationService;

@RestController
public class ReservationController {

	@Autowired
	private ReservationService resSer;
	
	
	// 예약 내역에서 예약한 숙소
	@GetMapping("/BookHistory")
	public ResponseEntity<?> bookhistory(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){
		
		Long userNo = customOAuth2User.getUserNo();
		//Long userNo = 1L;
		return new ResponseEntity<>(resSer.findBookHistory(userNo),HttpStatus.OK);
	}
	
	
	// 예약 내역에서 이용한 숙소
	@GetMapping("/BookedHistory")
	public ResponseEntity<?> bookedhistory(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam int showMonth){
			
		Long userNo = customOAuth2User.getUserNo();
		//Long userNo = 1L;
		return new ResponseEntity<>(resSer.findBookedHistory(userNo,showMonth),HttpStatus.OK);
	}
		
//		
//	// 예약 내역에서 취소한 숙소
//	@GetMapping("/BookCancleHistory")
//	public ResponseEntity<?> bookcanclehistory(@RequestParam(defaultValue = "1")long userNo
//											  ,@RequestParam(defaultValue = "N")String payStatus){
//					
//		return new ResponseEntity<>(resSer.findBookCancleHistory(userNo,payStatus),HttpStatus.OK);
//
//	}
	
	
	// 예약 취소는 Payment Controller에 있음

		
}
