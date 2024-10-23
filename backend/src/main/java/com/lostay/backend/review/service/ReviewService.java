package com.lostay.backend.review.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.point.repository.PointRepository;
import com.lostay.backend.review.dto.ReviewDTO;
import com.lostay.backend.review.entity.Review;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

@Service
@Transactional
public class ReviewService {

	
	@Autowired
	private PaymentRepository payRepo;
	
	@Autowired
	private ReviewRepository revRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoomRepository roomRepo;
	
	@Autowired
	private PointRepository poRepo;
	
	@Autowired
	private HotelRepository hotelRepo;
	
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

	// 작성한 리뷰 저장, 리뷰 작성 시 포인트 적립
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
		
		// 리뷰 작성 시 포인트 적립
		Point newPoint = new Point();
		newPoint.setUser(user);
		newPoint.setPointDay(now);
		newPoint.setPointPlusMinus(500);
		newPoint.setPointTitle("리뷰 작성");
		//  0이면 적립, 1이면 사용
		newPoint.setStatus(0);
		
		poRepo.save(newPoint);
		
		// 유저 전체의 포인트 계산후 업데이트
		int userPoint = user.getUserPoint();
		int totalPoint = userPoint + 500;
		user.setUserPoint(totalPoint);
		userRepo.save(user);
		
		
	}

	// 룸리스트 페이지에서 해당 호텔 전체 리뷰 조회
	public List<ReviewDTO> findAllHotelReview(long hotelNo) {
		
		List<Object[]> ReviewList = revRepo.findHotelReview(hotelNo);
		List<ReviewDTO> dtoList = new ArrayList<ReviewDTO>();
		
		for(Object[] d : ReviewList) {
			ReviewDTO dto = new ReviewDTO();
			dto.setReviewContent((String)d[0]);
			
			String[] str = d[1].toString().split(",");
			dto.setReviewImg(str);
			dto.setReviewCreateAt((LocalDateTime)d[2]);
			dto.setReviewRating((double)d[3]);
			dto.setRoomNo((long)d[4]);
			dto.setUserNo((long)d[5]);
			dto.setRoomName((String)d[6]);
			dto.setReviewNo((long)d[7]);
			
			dtoList.add(dto);
		}
		
		
		
		return dtoList; 
	}

	
	// 객실리스트에서 최신 리뷰 3개
	public List<ReviewDTO> findHotelReview3(long hotelNo) {

		
		Pageable pageable = PageRequest.of(0, 3); // 첫 번째 페이지, 3개 항목
		
		List<Object[]> ReviewList = revRepo.findHotelReview3(hotelNo,pageable);
		List<ReviewDTO> dtoList = new ArrayList<ReviewDTO>();
		
		double reviewAvg = revRepo.findHotelReviewAvg(hotelNo);
		int reviewCount = revRepo.findHotelReviewCount(hotelNo);
		
		for(Object[] d : ReviewList) {
			ReviewDTO dto = new ReviewDTO();
			dto.setReviewContent((String)d[0]);
			
			dto.setReviewCreateAt((LocalDateTime)d[1]);
			dto.setReviewRating((double)d[2]);
			dto.setRoomNo((long)d[3]);
			dto.setUserNo((long)d[4]);
			dto.setRoomName((String)d[5]);
			dto.setReviewNo((long)d[6]);
			dto.setReviewAvg(reviewAvg);
			dto.setReviewCount(reviewCount);
						
			dtoList.add(dto);
		}
		
		
		return dtoList;
	}

	// 객실에 대한 리뷰 전체 조회
	public List<ReviewDTO> findRoomReviewAll(long roomNo) {
		
		List<Review> newReview = revRepo.findByRoom_RoomNo(roomNo);
		
		List<ReviewDTO> dtos = new ArrayList<ReviewDTO>();
		
		for(Review r : newReview)	{
			ReviewDTO dto = new ReviewDTO();
			dto.setReviewNo(r.getReviewNo());
			dto.setRoomNo(r.getRoom().getRoomNo());
			dto.setUserNo(r.getUser().getUserNo());
			dto.setUserNickname(r.getUser().getUserNickname());
			dto.setReviewRating(r.getReviewRating());
			dto.setReviewCreateAt(r.getReviewCreateAt());
			String[] str = r.getReviewImg().split(",");
			dto.setReviewImg(str);
			dto.setRoomName(r.getRoom().getRoomName());
			dto.setReviewContent(r.getReviewContent());
			
			dtos.add(dto);
		}
		
		return dtos;
	}


	
	
	
	
	
	
	
	

}
