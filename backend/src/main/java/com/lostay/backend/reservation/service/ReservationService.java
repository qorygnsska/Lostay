package com.lostay.backend.reservation.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
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
			
			// 예약 취소가 가능한 상태인지
		
			LocalDateTime checkInDate = dto.getCheckIn();
		    
		    // 체크인 날짜로부터 1일 전의 날짜
			LocalDate cancleRoomDeadline = checkInDate.minusDays(1).toLocalDate();
		    
		    // 현재 시간이 체크인 날짜 1루 전인지 값 넣기
		    if (LocalDate.now().isBefore(cancleRoomDeadline)) {
		        bookHistoryDTO.setIsRoomCancle(true);
		    } else {
		        bookHistoryDTO.setIsRoomCancle(false);
		    }
	
			bookHistoryDTO.setIsWriteReview(false);
			bookHistoryDTO.setIsPayCancel(false);
			
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
				LocalDate checkInDate = dto.getCheckIn().toLocalDate();
			    
			    // 체크인 날짜로부터 7일 후의 날짜
			    LocalDate reviewDeadline = checkInDate.plusDays(7);
			    
			    // 현재 시간이 체크인 날짜와 7일 후 날짜 사이인지 확인
			    if (!LocalDate.now().isAfter(reviewDeadline)) {
			        bookHistoryDTO.setIsWriteReview(true);
			    } else {
			        bookHistoryDTO.setIsWriteReview(false);
			    }
	        } else {
	        	bookHistoryDTO.setIsWriteReview(false);
	        }
			
			bookHistoryDTO.setIsRoomCancle(false);
			bookHistoryDTO.setIsPayCancel(false);
			
	        bookHistoryList.add(bookHistoryDTO);
		}
		
		
		return bookHistoryList;
	}
	
	// 예약 내역에서 취소한 숙소
	public List<BookHistoryDTO> findBookCancleHistory(Long userNo, int showMonth) {
		
		// 취소한 상태
		String resStatus = "N";
		
		// 예약취소 한 숙소 리스트 보여주기
		List<ReservationHistoryDTO> ReservationHistoryList = resRepo.findBookCancleHistory(userNo, resStatus);
		
		List<BookHistoryDTO> bookHistoryList = new ArrayList<BookHistoryDTO>();
		
		for(ReservationHistoryDTO dto : ReservationHistoryList) {
			System.out.println(dto.toString());
			BookHistoryDTO bookHistoryDTO = new BookHistoryDTO();
			
			// 기본 셋팅
			bookHistorySet(bookHistoryList, bookHistoryDTO, dto);
			
			bookHistoryDTO.setIsWriteReview(false);
			bookHistoryDTO.setIsRoomCancle(false);
			bookHistoryDTO.setIsPayCancel(true);
			
	        bookHistoryList.add(bookHistoryDTO);
		}
		
		return bookHistoryList;
	}

	
	// 셋팅
	private void bookHistorySet(List<BookHistoryDTO> bookHistoryList, BookHistoryDTO bookHistoryDTO, ReservationHistoryDTO dto) {
		
		bookHistoryDTO.setReservationNo(dto.getReservationNo());
		bookHistoryDTO.setPayNo(dto.getPayNo());
		bookHistoryDTO.setRoomNo(dto.getRoomNo());
		bookHistoryDTO.setRoomName(dto.getRoomName());
		bookHistoryDTO.setRoomCheckinTime(dto.getRoomCheckInTime().toString().substring(0, 5));
		bookHistoryDTO.setRoomCheckoutTime(dto.getRoomCheckOutTime().toString().substring(0, 5));
		bookHistoryDTO.setHotelNo(dto.getHotelNo());
		bookHistoryDTO.setHotelName(dto.getHotelName());
		bookHistoryDTO.setHotelThumbnail(dto.getHotelThumbnail());
		
		
		// 날짜 계산
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
		String payDate = dto.getPayDay().format(formatter);
        String checkInDate = dto.getCheckIn().format(formatter);
        String checkOutDate = dto.getCheckOut().format(formatter);
        
        bookHistoryDTO.setPayDay(payDate);
        bookHistoryDTO.setCheckInDate(checkInDate);
        bookHistoryDTO.setCheckOutDate(checkOutDate);
       
       
        // 요일 구하기
        DayOfWeek dayOfWeek = dto.getCheckIn().getDayOfWeek();
        String checkIndayOfWeek = dayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.KOREAN);
        bookHistoryDTO.setCheckInDayOfWeek(checkIndayOfWeek);
        
        dayOfWeek = dto.getCheckOut().getDayOfWeek();
        String checkOutdayOfWeek = dayOfWeek.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.KOREAN);
        bookHistoryDTO.setCheckOutDayOfWeek(checkOutdayOfWeek);

        // 몇 박인지 계산
        long nights = ChronoUnit.DAYS.between(dto.getCheckIn().toLocalDate(), dto.getCheckOut().toLocalDate());
        bookHistoryDTO.setNights(nights + "박");
	}


}
