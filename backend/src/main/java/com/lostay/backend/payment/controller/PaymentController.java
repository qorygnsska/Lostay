package com.lostay.backend.payment.controller;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@Autowired
	private PaymentRepository payRepo;
	
	@GetMapping("/payment")
	public void pay() {
		Long userNo = 1L;
		List<Payment> payment = payRepo.findByUser_UserNo(userNo);
		for(Payment p : payment) {
			System.out.println(p);
		}
	}
	
//	@GetMapping("/PaymentHistory")
//	public ResponseEntity<?> paymenthistory(){
//		log.info("PaymentHistory 실행");
//		
//		Long userNo = 1L;
//		
//		return new ResponseEntity<>(paySer.findAll(userNo));
//	}
//	
}
