package com.lostay.backend.reservation.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.reservation.dto.ReservationDTO;
import com.lostay.backend.reservation.entity.Reservation;
import com.lostay.backend.reservation.repository.ReservationRepository;

@Service
@Transactional
public class ReservationService {

	@Autowired
	private ReservationRepository resRepo;
	
	@Autowired
	private PaymentRepository payRepo;
	
	// 예약 내역에서 예약한 숙소
	public List<PaymentDTO> findBookHistory(long userNo) {
		
		String payStatus = "Y";
		
		List<Payment> payList = payRepo.findByUser_UserNoAndPayStatus(userNo,payStatus);
		
		List<PaymentDTO> dtoList = 	new ArrayList<PaymentDTO>();
		
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime nowTime = now.toLocalDate().atTime(11,0); 
		
		for(Payment pay : payList) {
			 
		    LocalDateTime checkOut = pay.getReservations().getCheckOut();
			PaymentDTO dto = new PaymentDTO();
			
			if(checkOut.isAfter(nowTime)) {
				dto.setPayNo(pay.getPayNo());
				dto.setPayDay(pay.getPayDay());
				dto.setHotelNo(pay.getRoom().getHotel().getHotelNo());
				dto.setHotelName(pay.getRoom().getHotel().getHotelName());
				dto.setCheckIn(pay.getReservations().getCheckIn());
				dto.setCheckOut(pay.getReservations().getCheckOut());
				dto.setRoomNo(pay.getRoom().getRoomNo());
				dto.setRoomThumbnail(pay.getRoom().getRoomThumbnail());
				dto.setHotelThumbnail(pay.getRoom().getHotel().getHotelThumbnail());
				dto.setRoomCheckinTime(pay.getRoom().getRoomCheckinTime());
				dto.setRoomCheckoutTime(pay.getRoom().getRoomCheckoutTime());
				
				LocalDateTime checkIn2 = pay.getReservations().getCheckIn();
			    LocalDateTime checkOut2 = pay.getReservations().getCheckOut();
			    Period period = Period.between(checkIn2.toLocalDate(), checkOut2.toLocalDate());
			    dto.setPeriod(period.getDays());
			     
			    if(now.toLocalDate().isEqual(checkIn2.toLocalDate()) || now.toLocalDate().isAfter(checkIn2.toLocalDate())) {
			    	dto.setCancleAble("N");
			    }else {
			    	dto.setCancleAble("Y");
			    }
				
				dtoList.add(dto);
			}
			
			
		}
		
		
		return dtoList;
	}
	
	
	// 예약 내역에서 이용한 숙소
		public List<PaymentDTO> findBookedHistory(long userNo, String payStatus) {
			
			List<Payment> payList = payRepo.findByUser_UserNoAndPayStatus(userNo,payStatus);
			
			List<PaymentDTO> dtoList = 	new ArrayList<PaymentDTO>();
			
			LocalDateTime now = LocalDateTime.now();
			LocalDateTime nowTime = now.toLocalDate().atTime(11,0); 
			
			for(Payment pay : payList) {
				 
			    LocalDateTime checkOut = pay.getReservations().getCheckOut();
				PaymentDTO dto = new PaymentDTO();
				
				if(checkOut.isBefore(nowTime)) {
					dto.setPayNo(pay.getPayNo());
					dto.setPayDay(pay.getPayDay());
					dto.setHotelNo(pay.getRoom().getHotel().getHotelNo());
					dto.setHotelName(pay.getRoom().getHotel().getHotelName());
					dto.setCheckIn(pay.getReservations().getCheckIn());
					dto.setCheckOut(pay.getReservations().getCheckOut());
					dto.setRoomNo(pay.getRoom().getRoomNo());
					dto.setRoomThumbnail(pay.getRoom().getRoomThumbnail());
					dto.setHotelThumbnail(pay.getRoom().getHotel().getHotelThumbnail());
					dto.setRoomCheckinTime(pay.getRoom().getRoomCheckinTime());
					dto.setRoomCheckoutTime(pay.getRoom().getRoomCheckoutTime());
					
					LocalDateTime checkIn2 = pay.getReservations().getCheckIn();
				    LocalDateTime checkOut2 = pay.getReservations().getCheckOut();
				    Period period = Period.between(checkIn2.toLocalDate(), checkOut2.toLocalDate());
				    dto.setPeriod(period.getDays());
				    
				    if(now.toLocalDate().isAfter(checkOut2.toLocalDate().plusWeeks(1))) {
				    	dto.setReviewAble("N");
				    }else {
				    	dto.setReviewAble("Y");
				    }
					
					dtoList.add(dto);
				}
				
				
			}
			
			
			return dtoList;
		}


		
		// 예약 내역에서 취소한 숙소
		public List<PaymentDTO> findBookCancleHistory(long userNo, String payStatus) {
			
			List<Payment> payList = payRepo.findByUser_UserNoAndPayStatus(userNo,payStatus);
			
			List<PaymentDTO> dtoList = 	new ArrayList<PaymentDTO>();
			
			for(Payment pay : payList) {
			   
				PaymentDTO dto = new PaymentDTO();
		
				dto.setPayNo(pay.getPayNo());
				dto.setPayDay(pay.getPayDay());
				dto.setHotelNo(pay.getRoom().getHotel().getHotelNo());
				dto.setHotelName(pay.getRoom().getHotel().getHotelName());
				dto.setCheckIn(pay.getReservations().getCheckIn());
				dto.setCheckOut(pay.getReservations().getCheckOut());
				dto.setRoomNo(pay.getRoom().getRoomNo());
				dto.setRoomThumbnail(pay.getRoom().getRoomThumbnail());
				dto.setHotelThumbnail(pay.getRoom().getHotel().getHotelThumbnail());
				dto.setRoomCheckinTime(pay.getRoom().getRoomCheckinTime());
				dto.setRoomCheckoutTime(pay.getRoom().getRoomCheckoutTime());
				
				
				LocalDateTime checkIn2 = pay.getReservations().getCheckIn();
			    LocalDateTime checkOut2 = pay.getReservations().getCheckOut();
			    Period period = Period.between(checkIn2.toLocalDate(), checkOut2.toLocalDate());
			    dto.setPeriod(period.getDays());
						
				dtoList.add(dto);
			
				
				
			}
			
			
			return dtoList;
		}

}
