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
	
	public List<PaymentDTO> findAll(Long userNo){
		
		// 결제 엔터티 리스트 생성
		List<Payment> payment = payRepo.findByUser_UserNo(userNo);
				
		// 결제 디티오 리스트 생성
		List<PaymentDTO> payList = new ArrayList<PaymentDTO>();
		
		// 레포지토리에서 찾은 결제 내역들 dto 생성해서 dto에 하나씩 넣어주기
		for(Payment pay : payment) {
			PaymentDTO dto = new PaymentDTO();
			dto.setPayNo(pay.getPayNo());			
			dto.setUserNo(pay.getUser().getUserNo());
			dto.setPayStatus(pay.getPayStatus());
			dto.setHotelName(pay.getRoom().getHotel().getHotelName());
			dto.setHotelAddress(pay.getRoom().getHotel().getHotelAdress());
			dto.setCheckIn(pay.getReservations().getCheckIn());
			dto.setCheckOut(pay.getReservations().getCheckOut());
			dto.setUserName(pay.getUser().getUserName());
			dto.setUserPhone(pay.getUser().getUserPhone());
			dto.setPayDay(pay.getPayDay());
			dto.setPayType(pay.getPayType());
			dto.setPayPrice(pay.getPayPrice());
			dto.setPayPoint(pay.getPayPoint());
			
			payList.add(dto);
		}
		
		return payList;
	}
}
