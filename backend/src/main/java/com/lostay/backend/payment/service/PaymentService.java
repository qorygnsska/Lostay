package com.lostay.backend.payment.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository payRepo;
	
//	public List<PaymentDTO> findAll(Long userNo){
//		List<Payment> payment = payRepo.findbyUser_UserNo(userNo);
		
		
		
//		List<PaymentDTO> payList = new ArrayList<PaymentDTO>();
//		
//		for(Payment pay : payment) {
//			PaymentDTO dto = new PaymentDTO();
//			dto.set
//		}
		
//	}
}
