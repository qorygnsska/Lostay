package com.lostay.backend.payment.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.discount.entity.Discount;
import com.lostay.backend.discount.repository.DiscountRepository;
import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.point.repository.PointRepository;
import com.lostay.backend.reservation.dto.ReservationDTO;
import com.lostay.backend.reservation.entity.Reservation;
import com.lostay.backend.reservation.repository.ReservationRepository;
import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;
import com.lostay.backend.user.dto.UserDTO;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

@Service
@Transactional
public class PaymentService {

	@Autowired
	private PaymentRepository payRepo;

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ReservationRepository resRepo;
	
	@Autowired
	private PointRepository poRepo;
	
	@Autowired
	private DiscountRepository disRepo;

	// payNo로 결제/취소 내역 가져오기
	public PaymentDTO findPayHistory(Long payNo) {

		// 결제 엔터티 리스트 생성
		Optional<Payment> newPayment = payRepo.findById(payNo);
		Payment payment = newPayment.get();

		// 레포지토리에서 찾은 결제 내역들 dto 생성해서 dto에 하나씩 넣어주기

		PaymentDTO dto = new PaymentDTO();
		dto.setPayNo(payment.getPayNo());
		dto.setUserNo(payment.getUser().getUserNo());
		dto.setPayStatus(payment.getPayStatus());
		dto.setHotelName(payment.getRoom().getHotel().getHotelName());
		dto.setHotelAddress(payment.getRoom().getHotel().getHotelAdress());
		dto.setCheckIn(payment.getReservations().getCheckIn()); // 체크인 날짜 시간은 안가져옴
		dto.setCheckOut(payment.getReservations().getCheckOut()); // 체크아웃 날짜 시간은 안가져옴
		dto.setUserName(payment.getUser().getUserName());
		dto.setUserPhone(payment.getUser().getUserPhone());
		dto.setPayDay(payment.getPayDay());
		dto.setPayType(payment.getPayType());
		// 결제당시 할인율이 적용된 객실 금액
		dto.setRoomPrice(payment.getPayPrice() + payment.getPayPoint());
		dto.setPayPrice(payment.getPayPrice());
		dto.setPayPoint(payment.getPayPoint());
		dto.setCancleDay(payment.getCancleDay());

		return dto;
	}

	// 결제 진행 페이지에서 호텔과 객실(투숙)정보 가져오기
	public RoomDTO findRoomInfo(long roomNo, LocalDate checkInDate, LocalDate checkOutDate) {

		Optional<Room> newRoom = roomRepo.findById(roomNo);

		Period period = Period.between(checkInDate, checkOutDate);
		
		List<Discount> disList = disRepo.findAll();
		
		Room room = newRoom.get();
		RoomDTO roomDto = new RoomDTO();

		roomDto.setRoomNo(room.getRoomNo());
		roomDto.setHotelNo(room.getHotel().getHotelNo());
		roomDto.setHotelName(room.getHotel().getHotelName());
		roomDto.setHotelRating(room.getHotel().getHotelRating());
		roomDto.setHotelThumbnail(room.getHotel().getHotelThumbnail());
		roomDto.setRoomName(room.getRoomName());
		roomDto.setRoomCheckIn(checkInDate); // 입실날짜
		roomDto.setRoomCheckOut(checkOutDate); // 퇴실날짜
		roomDto.setRoomCheckinTime(room.getRoomCheckinTime()); // 입실시간
		roomDto.setRoomCheckoutTime(room.getRoomCheckoutTime()); // 퇴실시간
		roomDto.setRoomPeopleInfo(room.getRoomPeopleInfo());
		roomDto.setRoomPrice(room.getRoomPrice());
		int roomPrice = room.getRoomPrice();
		int roomDiscount = room.getRoomDiscount();
		int discountPrice = (int)roomPrice - roomPrice * roomDiscount/100;
		int finalPrice = discountPrice * period.getDays();
		roomDto.setDiscountPrice(finalPrice);
		roomDto.setDisList(disList);

		return roomDto;
	}

	// 결제 진행 페이지에서 예약자 정보 가져오기
	public UserDTO findUserInfo(long userNo) {

		Optional<User> newUser = userRepo.findById(userNo);
		User user = newUser.get();
		UserDTO userDto = new UserDTO();

		userDto.setUserNo(userNo);
		userDto.setUserName(user.getUserName());
		userDto.setUserPhone(user.getUserPhone());
		userDto.setUserEmail(user.getUserEmail());
		userDto.setUserPoint(user.getUserPoint());

		return userDto;
	}

	// 결제 테이블 데이터 삽입, 유저 총 포인트 업데이트, 예약 테이블 데이터 삽입, 포인트 내역 테이블 데이터 삽입
	public Boolean savePayment(long userNo, PaymentDTO dto) {

		Optional<User> newUser = userRepo.findById(userNo);
		User user = newUser.get();

		// 유저가 사용한 포인트 계산해서 업데이트
		int userPoint = user.getUserPoint();
		int totalPoint = userPoint - dto.getPayPoint();
		user.setUserPoint(totalPoint);
		User u = userRepo.save(user);
		
			
		// 포인트 테이블에 포인트 내역 추가해야 함
		 Point po = new Point();
		if(dto.getPayPoint() > 0) {
			LocalDateTime now = LocalDateTime.now();
			Point newPoint = new Point();
			newPoint.setUser(user);
			newPoint.setPointDay(now);
			
			newPoint.setPointPlusMinus(-1 * dto.getPayPoint());
			newPoint.setPointTitle("숙박 예약 사용");
			
		    po = poRepo.save(newPoint);
		}
		//  0이면 적립, 1이면 사용
//		newPoint.setStatus(1);
		
				
		// 객실에 관련된 정보 결제테이블에 외래키로 넣어주기
		Optional<Room> newRoom = roomRepo.findById(dto.getRoomNo());
		Room room = newRoom.get();

		Payment savePay = new Payment();

		savePay.setUser(user);
		savePay.setRoom(room);
		
		Discount discount = disRepo.findById(dto.getDisNo()).get();
		savePay.setPayType(discount.getDisCategory());
		savePay.setPayDay(dto.getPayDay());
//		int roomPrice = room.getRoomPrice();
//		int roomDiscount = room.getRoomDiscount();
//		int discountPrice = (int)roomPrice - roomPrice * roomDiscount/100;
//		savePay.setDisPrice(discountPrice);
		// 실제 결제 가격
		savePay.setPayPrice(dto.getPayPrice());
		savePay.setPayPoint(dto.getPayPoint());
		savePay.setPayStatus("Y");
		savePay.setImpUid(dto.getImp_uid());

		Payment p = payRepo.save(savePay);

		// 결제 테이블에 들어온 정보 예약 테이블에 넣어주기
		Reservation reservation = new Reservation();
		
		LocalDateTime in = dto.getCheckIn().toLocalDate().atTime(15,0);
		LocalDateTime out = dto.getCheckOut().toLocalDate().atTime(11,0);
		
		reservation.setCheckIn(in);
		reservation.setCheckOut(out);
		reservation.setPayment(savePay);

		Reservation r = resRepo.save(reservation);
		
		if(p.getPayNo() != null & r.getReservationNo() != null 
			&u.getUserNo() != null & po.getPointNo() !=null) {
			return true;
		}else {
			return false;
		}
	}

	// 결제/예약 취소(status N으로 업데이트)
	public void canclePayment(Long payNo, Long userNo) {

		Optional<Payment> newPayment = payRepo.findById(payNo);
		Payment payment = newPayment.get();

		Optional<User> newUser = userRepo.findById(userNo);
		User user = newUser.get();
		
		int payPoint = payment.getPayPoint();
		int userPoint = user.getUserPoint();
		user.setUserPoint(userPoint + payPoint);
		userRepo.save(user);
		
		Optional<Reservation> newReservation = resRepo.findByPayment_PayNo(payNo);
		Reservation reservation = newReservation.get();
		reservation.setResStatus("N");
		payment.setPayStatus("N");
		resRepo.save(reservation);
		payRepo.save(payment);
		
		if(payPoint > 0) {
			
			Point point = new Point();
			LocalDateTime now = LocalDateTime.now();
			point.setPointDay(now);
			point.setUser(user);
			point.setPointTitle("숙박 결제 취소");
			point.setPointPlusMinus(payPoint);
			poRepo.save(point);
		}

	}

	// 사전검증, 결제 전에 결제하려는 금액과 실제 결제할 금액이 같은지
	public int compareAmount(long userNo, int point, Long roomNo, Long disNo) {
		
		User user = userRepo.findById(userNo).get();
		int amount = -1;
		int totalPoint = user.getUserPoint();
		
		if(totalPoint < point) {
			return amount;
		}else {
			Room room = roomRepo.findById(roomNo).get();
			int discountPrice = room.getRoomPrice() - (room.getRoomPrice() * room.getRoomDiscount()/100);
		
			Discount discount = disRepo.findById(disNo).get();
		
			amount = discountPrice - (discountPrice * (int)discount.getDisRate()/100) - point;
			
			
		}
		
		return amount;
	}

}
