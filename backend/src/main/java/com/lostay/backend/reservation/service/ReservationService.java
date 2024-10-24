package com.lostay.backend.reservation.service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.reservation.dto.BookHistoryDTO;
import com.lostay.backend.reservation.dto.ReservationHistoryDTO;
import com.lostay.backend.reservation.repository.ReservationRepository;

@Service
@Transactional
public class ReservationService {

	@Autowired
	private ReservationRepository resRepo;

	// 예약 내역에서 예약한 숙소
	public List<BookHistoryDTO> findBookHistory(Long userNo) {

		// 예약한 상태
		String resStatus = "Y";

		// 체크인 안한 숙소 리스트 보여주기
		List<ReservationHistoryDTO> ReservationHistoryList = resRepo.findBookHistory(userNo, resStatus);
		
		List<BookHistoryDTO> bookHistoryList = new ArrayList<BookHistoryDTO>();
		
		for(ReservationHistoryDTO dto : ReservationHistoryList) {
		
			BookHistoryDTO bookHistoryDTO = new BookHistoryDTO();
			
			// 기본 셋팅
			bookHistorySet(bookHistoryList, bookHistoryDTO, dto);
			
			bookHistoryDTO.setIsWriteReview(null);
			
	        bookHistoryList.add(bookHistoryDTO);
		
		}
		return bookHistoryList;
	}

	// 예약 내역에서 이용한 숙소
	public List<BookHistoryDTO> findBookedHistory(Long userNo, int showMonth) {

		// 예약한 상태
		String resStatus = "Y";

		// 3개월, 6개월, 1년 전 1일로 설정
		LocalDateTime currentDateTime = LocalDateTime.now();
		LocalDateTime startDateTime = currentDateTime.minusMonths(showMonth).withDayOfMonth(1);
		

		// 체크인 한 숙소 리스트 보여주기
		List<ReservationHistoryDTO> ReservationHistoryList = resRepo.findBookedHistory(userNo, resStatus, startDateTime);
		
		List<BookHistoryDTO> bookHistoryList = new ArrayList<BookHistoryDTO>();
		
		for(ReservationHistoryDTO dto : ReservationHistoryList) {
			
			BookHistoryDTO bookHistoryDTO = new BookHistoryDTO();
			
			// 기본 셋팅
			bookHistorySet(bookHistoryList, bookHistoryDTO, dto);
			
			// 리뷰 작성 가능 여부
			if ("N".equals(dto.getResReviewStatus())) {
				LocalDateTime checkInDate = dto.getCheckIn();
			    
			    // 체크인 날짜로부터 7일 후의 날짜
			    LocalDateTime reviewDeadline = checkInDate.plusDays(7);
			    
			    // 현재 시간이 체크인 날짜와 7일 후 날짜 사이인지 확인
			    if (currentDateTime.isAfter(checkInDate) && currentDateTime.isBefore(reviewDeadline)) {
			        bookHistoryDTO.setIsWriteReview("Y");
			    } else {
			        bookHistoryDTO.setIsWriteReview("N");
			    }
	        } else {
	        	bookHistoryDTO.setIsWriteReview("N");
	        }
			
	        bookHistoryList.add(bookHistoryDTO);
		}
		
		return bookHistoryList;
	}
	
	// 예약 내역에서 취소한 숙소
//	public List<ReservationHistoryDTO> findBookCancleHistory(Long userNo, int showMonth) {
//
//		// 예약한 상태
//		String resStatus = "N";
//
//		// 3개월, 6개월, 1년 전 1일로 설정
//		LocalDateTime currentDateTime = LocalDateTime.now();
//		LocalDateTime startDateTime = currentDateTime.minusMonths(showMonth).withDayOfMonth(1);
//		
//
//		// 체크인 한 숙소 리스트 보여주기
//		List<ReservationHistoryDTO> reservationHistoryDTO = resRepo.findBookCancleHistory(userNo, resStatus, startDateTime);
//
//		return reservationHistoryDTO;
//	}

	
	// 셋팅
	private void bookHistorySet(List<BookHistoryDTO> bookHistoryList, BookHistoryDTO bookHistoryDTO, ReservationHistoryDTO dto) {
		
		bookHistoryDTO.setReservationNo(dto.getReservationNo());
		bookHistoryDTO.setPayNo(dto.getPayNo());
		bookHistoryDTO.setRoomNo(dto.getRoomNo());
		bookHistoryDTO.setRoomName(dto.getRoomName());
		bookHistoryDTO.setRoomCheckinTime(dto.getRoomCheckinTime());
		bookHistoryDTO.setRoomCheckoutTime(dto.getRoomCheckoutTime());
		bookHistoryDTO.setHotelNo(dto.getHotelNo());
		bookHistoryDTO.setHotelThumbnail(dto.getHotelThumbnail());
		
		
		// 날짜 계산
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        String checkInDate = dto.getCheckIn().format(formatter);
        String checkOutDate = dto.getCheckOut().format(formatter);
        
        // 요일 구하기
        DayOfWeek dayOfWeek = dto.getCheckIn().getDayOfWeek();
        String checkIndayOfWeek = dayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.KOREAN);
        bookHistoryDTO.setCheckInDate(checkInDate);
        bookHistoryDTO.setCheckInDayOfWeek(checkIndayOfWeek);
        
        dayOfWeek = dto.getCheckOut().getDayOfWeek();
        String checkOutdayOfWeek = dayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.KOREAN);
        bookHistoryDTO.setCheckOutDate(checkOutDate);
        bookHistoryDTO.setCheckOutDayOfWeek(checkOutdayOfWeek);

        // 몇 박인지 계산
        long nights = ChronoUnit.DAYS.between(dto.getCheckIn().toLocalDate(), dto.getCheckOut().toLocalDate());
        bookHistoryDTO.setNights(nights + "박");
	}
}
