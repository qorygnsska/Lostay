package com.lostay.backend.payment.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomReopository;
import com.lostay.backend.user.dto.UserDTO;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository payRepo;
	
	@Autowired
	private RoomReopository roomRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public List<PaymentDTO> findAll(Long userNo){
		
		// 결제 엔터티 리스트 생성
		List<Payment> payments = payRepo.findByUser_UserNo(userNo);
				
		// 결제 디티오 리스트 생성
		List<PaymentDTO> payList = new ArrayList<PaymentDTO>();
		
		// 레포지토리에서 찾은 결제 내역들 dto 생성해서 dto에 하나씩 넣어주기
		for(Payment pay : payments) {
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

	
	// 결제 진행 페이지에서 호텔과 객실(투숙)정보 가져오기
	public RoomDTO findRoomInfo(long roomNo, LocalDate checkInDate, LocalDate checkOutDate) {
	
		Optional<Room> roomInfo = roomRepo.findById(roomNo);
		
		Room room = roomInfo.get();
		RoomDTO roomDto = new RoomDTO();
		
		roomDto.setRoomNo(room.getRoomNo());
		roomDto.setHotelNo(room.getHotel().getHotelNo());
		roomDto.setHotelName(room.getHotel().getHotelName());
		roomDto.setHotelRating(room.getHotel().getHotelRating());
		roomDto.setRoomName(room.getRoomName());
		roomDto.setRoomCheckIn(checkInDate);   	// 입실날짜
		roomDto.setRoomCheckOut(checkOutDate);	// 퇴실날짜
		roomDto.setRoomCheckinTime(room.getRoomCheckinTime());  // 입실시간
		roomDto.setRoomCheckoutTime(room.getRoomCheckoutTime()); // 퇴실시간
		roomDto.setRoomPeopleInfo(room.getRoomPeopleInfo());
		roomDto.setRoomPrice(room.getRoomPrice());
		
		return roomDto;
	}

	// 결제 진행 페이지에서 예약자 정보 가져오기
	public UserDTO findUserInfo(long userNo) {
		
		Optional<User> userInfo = userRepo.findById(userNo);
		User user = userInfo.get();
		UserDTO userDto = new UserDTO();
		
		userDto.setUserNo(userNo);
		userDto.setUserName(user.getUserName());
		userDto.setUserPhone(user.getUserPhone());
		userDto.setUserEmail(user.getUserEmail());
		userDto.setUserPoint(user.getUserPoint());
		
		
		return userDto;
	}


	public void savePayment(long userNo, long roomNo, String payType, LocalDateTime payDay, String payStatus,
			int payPrice, int payPoint) {
		
		Optional<User> newUser = userRepo.findById(userNo);
		User user = newUser.get();
		
		Optional<Room> newRoom = roomRepo.findById(roomNo);
		Room room = newRoom.get();
		
		
		Payment savePay = new Payment();
		
		savePay.setUser(user);
		savePay.setRoom(room);
		savePay.setPayType(payType);
		savePay.setPayDay(payDay);
		savePay.setPayPrice(payPrice);
		savePay.setPayPrice(payPrice);
		savePay.setPayPoint(payPoint);
		
		payRepo.save(savePay);
		System.out.println("============================씨발 성공했다!!!!!!!!!!!");
		
	}
}
