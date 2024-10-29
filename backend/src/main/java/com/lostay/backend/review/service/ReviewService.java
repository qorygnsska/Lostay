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
import com.lostay.backend.reservation.entity.Reservation;
import com.lostay.backend.reservation.repository.ReservationRepository;
import com.lostay.backend.review.dto.HotelInfoDTO;
import com.lostay.backend.review.dto.HotelReviewsDTO;
import com.lostay.backend.review.dto.HotelRoomsDTO;
import com.lostay.backend.review.dto.ReviewDTO;
import com.lostay.backend.review.dto.ReviewsDTO;
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

	@Autowired
	private ReservationRepository resRepo;
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
		for (String img : fileReadName) {
		    sb.append("reviews/").append(img).append(","); // 파일명 앞에 "reviews/" 추가
		}

		String reviewImg = null;
		if (sb.length() > 0) {
		    sb.setLength(sb.length() - 1); // 마지막 쉼표 제거
		    reviewImg = sb.toString();
		}

		 
		
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
		// 0이면 적립, 1이면 사용
		newPoint.setStatus(0);

		poRepo.save(newPoint);

		// 유저 전체의 포인트 계산후 업데이트
		int userPoint = user.getUserPoint();
		int totalPoint = userPoint + 500;
		user.setUserPoint(totalPoint);
		userRepo.save(user);
		
		// 리뷰가 작성되면 예약테이블에서 리뷰 status y로 수정
		Optional<Reservation> reservation = resRepo.findByPayment_PayNo(payNo);
		Reservation r = reservation.get();
		r.setResReviewStatus("Y");
		resRepo.save(r);

	}

	// 룸리스트 페이지에서 해당 호텔 전체 리뷰 조회
	public List<ReviewDTO> findAllHotelReview(long hotelNo) {

		List<Object[]> ReviewList = revRepo.findHotelReview(hotelNo);
		List<ReviewDTO> dtoList = new ArrayList<ReviewDTO>();

		for (Object[] d : ReviewList) {
			ReviewDTO dto = new ReviewDTO();
			dto.setReviewContent((String) d[0]);
			String[] str = d[1].toString().split(",");
			dto.setReviewImg(str);
			dto.setReviewCreateAt((LocalDateTime) d[2]);
			dto.setReviewRating((double) d[3]);
			dto.setRoomNo((long) d[4]);
			dto.setUserNo((long) d[5]);
			dto.setRoomName((String) d[6]);
			dto.setReviewNo((long) d[7]);

			dtoList.add(dto);
		}

		return dtoList;
	}

	// 객실리스트에서 최신 리뷰 3개
	public List<ReviewDTO> findHotelReview3(long hotelNo) {

		Pageable pageable = PageRequest.of(0, 3); // 첫 번째 페이지, 3개 항목

		List<ReviewDTO> dtoList = new ArrayList<ReviewDTO>();
		long num = revRepo.findHotelReviewCount(hotelNo);
		
		if(num > 0) {
			List<Object[]> ReviewList = revRepo.findHotelReview3(hotelNo, pageable);

			double reviewAvg = revRepo.findHotelReviewAvg(hotelNo);
			long reviewCount = revRepo.findHotelReviewCount(hotelNo);

			for (Object[] d : ReviewList) {
				ReviewDTO dto = new ReviewDTO();
				dto.setReviewContent((String) d[0]);

				dto.setReviewCreateAt((LocalDateTime) d[1]);
				dto.setReviewRating((double) d[2]);
				dto.setRoomNo((long) d[3]);
				dto.setUserNo((long) d[4]);
				dto.setRoomName((String) d[5]);
				dto.setReviewNo((long) d[6]);
				dto.setReviewAvg(reviewAvg);
				dto.setReviewCount(reviewCount);

				dtoList.add(dto);
			}
			
			return dtoList;
		}else {
			
			return dtoList;
		}
		
		

	}

	// 객실에 대한 리뷰 전체 조회
	public List<ReviewDTO> findRoomReviewAll(long roomNo) {

		List<Review> newReview = revRepo.findByRoom_RoomNo(roomNo);

		List<ReviewDTO> dtos = new ArrayList<ReviewDTO>();
		

		for (Review r : newReview) {
			if(r.getReviewSanctionsAt() == null) {
				
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
		}

		return dtos;
	}

	// 객실에 대한 리뷰 상위 3개
	public List<ReviewDTO> findRoomReview3(long roomNo) {

		Pageable pageable = PageRequest.of(0, 3); // 첫 번째 페이지, 3개 항목
		List<ReviewDTO> dtos = new ArrayList<ReviewDTO>();
		
		long num = revRepo.findRoomReviewCount(roomNo);
		
		if (num > 0) {
			List<Object[]> newReview = revRepo.findRoomReview3(roomNo, pageable);
			
			double reviewAvg = revRepo.findRoomReviewAvg(roomNo);
			long reviewCount = revRepo.findRoomReviewCount(roomNo);

			for (Object[] d : newReview) {
				ReviewDTO dto = new ReviewDTO();
				dto.setReviewContent((String) d[0]);

				dto.setReviewCreateAt((LocalDateTime) d[1]);
				dto.setReviewRating((double) d[2]);
				dto.setRoomNo((long) d[3]);
				dto.setUserNo((long) d[4]);
				dto.setRoomName((String) d[5]);
				dto.setReviewNo((long) d[6]);
				dto.setReviewAvg(reviewAvg);
				dto.setReviewCount(reviewCount);

				dtos.add(dto);
			}
			return dtos;
		}else {
			return dtos;
		}
	

	
	}

	// 호텔 리뷰 조회 (홍정훈)
	public Object findHotelReviews(Long hotelNo, Long roomNo, String sort) {
		HotelInfoDTO hotelInfoDTO = hotelRepo.hoteInfo(hotelNo);
		List<HotelRoomsDTO> roomNames = hotelRepo.findRoomNames(hotelNo);
		List<Object[]> results = new ArrayList<Object[]>();

		// roomNo가 있을 경우와 없을 경우에 따라 쿼리 실행
		if (roomNo != null) {
			results = findReviews(hotelNo, roomNo, sort);
		} else {
			results = findReviewsByHotelNo(hotelNo, sort);
		}

		
		List<ReviewsDTO> dtoList = new ArrayList<ReviewsDTO>();

		for (Object[] d : results) {
		
			ReviewsDTO dto = new ReviewsDTO();
			dto.setReviewNo((long) d[0]);
			dto.setReviewRating((double) d[1]);
			dto.setReviewCreateAt((LocalDateTime) d[2]);
			dto.setUserNickname((String) d[3]);
			dto.setRoomName((String) d[4]);
			dto.setReviewContent((String) d[5]);
			   // d[6]이 null인지 체크
		    if (d[6] != null) {
		        String[] str = d[6].toString().split(",");
		        dto.setReviewImg(str);
		    } else {
		        dto.setReviewImg(new String[0]); // 빈 배열로 설정
		    }
			dtoList.add(dto);
		}
	
		hotelInfoDTO.setHotelRoom(roomNames);

		HotelReviewsDTO hotelReviewsDTO = new HotelReviewsDTO(hotelInfoDTO, dtoList);

		return hotelReviewsDTO;
	}
	// 객실 조건 후 정렬 구분을 위한 메서드
	private List<Object[]> findReviews(Long hotelNo, Long roomNo, String orderByColumn) {

		if (orderByColumn == null) {
			return revRepo.findReviewsByDateDesc(hotelNo, roomNo); //최신작성순 기본정렬
		}
		switch (orderByColumn) {
		case "평점높은순":
			return revRepo.findReviewsByRatingDesc(hotelNo, roomNo);
		case "평점낮은순":
			return revRepo.findReviewsByRatingAsc(hotelNo, roomNo);
		default:
			return revRepo.findReviewsByDateDesc(hotelNo, roomNo); //최신작성순 기본정렬
		}
	}
	//객실 조건 없이 정렬 구분을 위한 메서드
	private List<Object[]> findReviewsByHotelNo(Long hotelNo, String orderByColumn) {
		
		if (orderByColumn == null) {
		
			return revRepo.findReviewsByDateDesc(hotelNo, null); //최신작성순 기본 정렬
		}
		switch (orderByColumn) {
		case "평점높은순":
			return revRepo.findReviewsByRatingDesc(hotelNo, null);
		case "평점낮은순":
			return revRepo.findReviewsByRatingAsc(hotelNo, null);
		default:
			return revRepo.findReviewsByDateDesc(hotelNo, null); //최신작성순 기본 정렬
		}
	}

}
