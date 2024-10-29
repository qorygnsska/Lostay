package com.lostay.backend.payment.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.payment.dto.PaymentVerificationDTO;
//import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.payment.service.PaymentService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class PaymentController {

	private IamportClient iamportClient;
	
	public PaymentController() {
		this.iamportClient = new IamportClient("7735864487762668", "5qFJBB44PsuFjiCgxOhnjmMoE3QVxEM4eRbGm49Hb7l8QoUqYyQEt4Bz82ij4qnxJgbWE46GxnlPWWqi");
	}
	
	
	@Autowired
	private PaymentService paySer;
	

	// 결제 내역
	@GetMapping("/PaymentHistory")
	public ResponseEntity<?> paymenthistory(@RequestParam(defaultValue = "3") Long payNo){

		
		return new ResponseEntity<>(paySer.findPayHistory(payNo),HttpStatus.OK);
	}
	
	
	// 결제 진행 페이지 호텔-객실(투숙) 정보 <결제정보에서 상품금액에서도 사용>
	@GetMapping("/HotelRoomInfo")
	public ResponseEntity<?> hotelroominfo(@RequestParam(defaultValue = "1") Long roomNo
										  ,@RequestParam(defaultValue = "2024-10-15") 
    									   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate
    									  ,@RequestParam(defaultValue = "2024-10-20") 
										   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate){
			
		
		
		return new ResponseEntity<>(paySer.findRoomInfo(roomNo,checkInDate,checkOutDate),HttpStatus.OK);
			
	}
	
	
	// 결제 진행 페이지 유저 정보 <결제정보에서 보유 포인트에서도 사용>
		@GetMapping("/UserInfo")
		public ResponseEntity<?> userinfo(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){
				
			Long userNo = customOAuth2User.getUserNo();
			
			return new ResponseEntity<>(paySer.findUserInfo(userNo),HttpStatus.OK);
				
		}
	
	
		
	// 사후검증	
	@PostMapping("/Payment/Verification")
	  private IamportResponse<Payment> paymentByImpUid(@RequestBody PaymentVerificationDTO payDTO) throws IamportResponseException,IOException {
        System.out.println(payDTO);
        //paymentByImpUid를 사용하기 위해서는 토큰 발급이 필요하고, 토큰 발급을 하기 위해서는 위에 복사해 두었던 REST API 키 와 REST API secret 가 필요합니다.
        return iamportClient.paymentByImpUid(payDTO.getImp_uid());
    }
	
	
	// 사후검증 완료 시 결제 테이블 데이터 삽입
	@GetMapping("/PaymentInsert")
	public void paymentinsert(@AuthenticationPrincipal CustomOAuth2User customOAuth2User
										  ,@RequestParam(defaultValue = "5") long roomNo
										  ,@RequestParam(defaultValue = "Naver") String payType
										  ,@RequestParam(defaultValue = "2024-10-20T15:00:00") // ISO 8601 형식
										   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime payDay
										  ,@RequestParam(defaultValue = "Y") String payStatus
										  ,@RequestParam(defaultValue = "100000") int payPrice
										  ,@RequestParam(defaultValue = "0") int payPoint
										  ,@RequestParam(defaultValue = "2024-11-21T15:00:00") 
	   									   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkInDate
	   									  ,@RequestParam(defaultValue = "2024-11-22T11:00:00") 
										   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOutDate){

		Long userNo = customOAuth2User.getUserNo();
		paySer.savePayment(userNo,roomNo,payType,payDay,payStatus,payPrice,payPoint,checkInDate,checkOutDate);
		
	}
	
	
	// 결제 취소
	@GetMapping("/PaymentCancle")
	public void paymentcancle(@RequestParam(defaultValue = "2") Long payNo,@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		
		Long userNo = 1L;
	
		// 결제 취소 api 아직 안들어옴
		
		paySer.canclePayment(payNo,userNo);
		
	}
	

}
