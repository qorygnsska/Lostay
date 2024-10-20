package com.lostay.backend.review.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.review.dto.ReviewDTO;
import com.lostay.backend.review.entity.Review;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomReopository;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

@Service
public class ReviewService {

	
	@Autowired
	private PaymentRepository payRepo;
	
	@Autowired
	private ReviewRepository revRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoomReopository roomRepo;
	
//	// 리뷰 작성하기 버튼 클릭
//	public void saveMyReview(double reviewRating, String reviewContent, ArrayList<String> fileReadName, long payNo) {
//
//		
//		
//		
//		
//	}

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
	public void saveMyReview(double reviewRating, String reviewContent, ArrayList<String> fileReadName, long payNo) {
				
		Optional<Payment> newPayment = payRepo.findById(payNo);
		
		long userNo = newPayment.get().getUser().getUserNo();
		long roomNo = newPayment.get().getRoom().getRoomNo();
		
		Optional<User> newUser = userRepo.findById(userNo);
		User user = newUser.get();
		
		Optional<Room> newRoom = roomRepo.findById(roomNo);
		Room room = newRoom.get();
		
		LocalDateTime now = LocalDateTime.now();
		
		
		StringBuilder sb = new StringBuilder();
		for(String img : fileReadName) {
			sb.append(img).append(", ");
		}
		
		if(sb.length() > 0) {
			sb.setLength(sb.length() - 2);
		}
		
		String reviewImg = sb.toString();
				
		Review review = new Review();
		review.setReviewContent(reviewContent);
		review.setReviewCreateAt(now);
		review.setReviewImg(reviewImg);
		review.setReviewRating(reviewRating);
		review.setRoom(room);
		review.setUser(user);
		
		revRepo.save(review);
		
	}

}
