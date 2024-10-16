package com.lostay.backend.review.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;

@Service
public class ReviewService {

	
	@Autowired
	private PaymentRepository payRepo;
	
	// 리뷰 작성하기 버튼 클릭
	public void saveMyReview(long payNo) {

		
		
		
		
	}

	// 리뷰 작성 페이지 이동
	public PaymentDTO findRoomUserInfo(long payNo) {
		
		Optional<Payment> newPayment = payRepo.findById(payNo);
		
		Payment pay = newPayment.get();
		
		PaymentDTO dto = new PaymentDTO();
		dto.setPayNo(payNo);
		dto.setHotelNo(pay.getRoom().getHotel().getHotelNo());
		dto.setHotelName(pay.getRoom().getHotel().getHotelName());
		dto.setRoomNo(pay.getRoom().getRoomNo());
		dto.setRoomName(pay.getRoom().getRoomName());
		dto.setUserNo(pay.getUser().getUserNo());
		dto.setUserName(pay.getUser().getUserName());
		
		
		return dto;
	}

	// 작성한 리뷰 저장
	public void saveMyReview(double reviewRating, String reviewContent, String[] reviewImg) {

		
	}

}
