package com.lostay.backend.payment.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.payment.service.PaymentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class PaymentController {

	
	@Autowired
	private PaymentService paySer;
	

	// 결제내역 확인 매핑
	@GetMapping("/PaymentHistory")
	public ResponseEntity<?> paymenthistory(){
		
		// 현재 세션 주인
		Long userNo = 1L;
		
		return new ResponseEntity<>(paySer.findAll(userNo),HttpStatus.OK);
	}
	
	
	// 결제 진행 페이지 호텔-객실(투숙) 정보 <결제정보에서 상품금액에서도 사용>
	@GetMapping("/HotelRoomInfo")
	public ResponseEntity<?> hotelroominfo(@RequestParam(defaultValue = "1") long roomNo
									
									,@RequestParam(defaultValue = "2024-10-15") 
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
    @RequestParam(defaultValue = "2024-10-20") 
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate){
			
		
		
		return new ResponseEntity<>(paySer.findRoomInfo(roomNo,checkInDate,checkOutDate),HttpStatus.OK);
			
	}
	
	
	// 결제 진행 페이지 유저 정보 <결제정보에서 보유 포인트에서도 사용>
		@GetMapping("/UserInfo")
		public ResponseEntity<?> userinfo(@RequestParam(defaultValue = "1") long userNo){
				
			
			
			return new ResponseEntity<>(paySer.findUserInfo(userNo),HttpStatus.OK);
				
		}
	
	
	
	// 결제하기
	@GetMapping("/PaymentInsert")
	public void paymentinsert(@RequestParam(defaultValue = "1") long userNo
										  ,@RequestParam(defaultValue = "2") long roomNo
										  ,@RequestParam(defaultValue = "kakao") String payType
										  ,@RequestParam(defaultValue = "2024-10-20T12:00:00") LocalDateTime payDay
										  ,@RequestParam(defaultValue = "Y") String payStatus
										  ,@RequestParam(defaultValue = "200000") int payPrice
										  ,@RequestParam(defaultValue = "400") int payPoint){
											
		

		paySer.savePayment(userNo,roomNo,payType,payDay,payStatus,payPrice,payPoint);
		
	}
	
	
}
