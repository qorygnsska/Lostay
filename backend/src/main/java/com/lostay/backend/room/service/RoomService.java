package com.lostay.backend.room.service;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.dto.RoomCustomDTO;
import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.dto.RoomListDTO;
import com.lostay.backend.room.dto.RoomListHotelInfoDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository roomRepo;
	
	@Autowired
	private ReviewRepository revRepo;

	
	// 호텔에 대한 객실 리스트 조회(호텔과 객실 정보)
	public RoomListDTO findHotelRoomList(Long hotelNo, LocalDateTime checkInDate, LocalDateTime checkOutDate, int peopleMax) {

		LocalDateTime in = checkInDate.toLocalDate().atTime(15,0);
		LocalDateTime out = checkOutDate.toLocalDate().atTime(11,0);
		
		Period period = Period.between(checkInDate.toLocalDate(), checkOutDate.toLocalDate());
		
//		List<Object[]> newRoom = roomRepo.findHotelRoomList(hotelNo, in, out);
		RoomListHotelInfoDTO Hoteldto = roomRepo.findHotelInfo(hotelNo);
		List<RoomCustomDTO> list = roomRepo.findRoomCumstomList(hotelNo,in,out);
		
//		List<RoomDTO> dtos = new ArrayList<RoomDTO>();
//		
//		int reviewCount = revRepo.findHotelReviewCount(hotelNo);
//		Double ReviewAvg = revRepo.findHotelReviewAvg(hotelNo);

		
//		if (ReviewAvg == null) {
//			ReviewAvg = 0.0;
//		}
		
		RoomListDTO dto = new RoomListDTO(
				Hoteldto
			   ,in.toLocalDate()
			   ,out.toLocalDate()
			   ,period.getDays()
			   ,list	
				);
////		
//		dto.setPeriod(period.getDays());
//		dto.setCheckInDay(in.toLocalDate());
//		dto.setCheckOutDay(out.toLocalDate());
////		dto.setReviewAvg(ReviewAvg);
////		dto.setTotalReviewCount(reviewCount);
//		dto.setList(list);
//		

		
		return dto;
	}


	
	//  해당 객실에 대한 정보 조회
	public RoomDTO findRoomInfo(long roomNo,LocalDateTime checkInDate, LocalDateTime checkOutDate, int peopleMax) {
		
		Optional<Room> newRoom = roomRepo.findById(roomNo);
		Room room = newRoom.get();
		
		RoomDTO dto = new RoomDTO();
		
		dto.setRoomNo(room.getRoomNo());
		dto.setRoomName(room.getRoomName());
		dto.setHotelNo(room.getHotel().getHotelNo());
		dto.setHotelName(room.getHotel().getHotelName());
		String[] str = room.getRoomAmenities().split(",");
		dto.setRoomAmenities(str);
		String[] str1 = room.getRoomIntroduction().split(",");
		dto.setRoomIntroduction(str1);
		dto.setRoomPrice(room.getRoomPrice());
		dto.setRoomDiscount(room.getRoomDiscount());
		int roomPrice = room.getRoomPrice();
		int roomDiscount = room.getRoomDiscount();
		int discountPrice = (int)roomPrice - roomPrice * roomDiscount/100;
		dto.setDiscountPrice(discountPrice);
		dto.setCheckInDay(checkInDate.toLocalDate());
		dto.setCheckOutDay(checkOutDate.toLocalDate());
		dto.setSearchPeople(peopleMax);
		String[] str2 = room.getRoomImg().split(",");
		dto.setRoomImg(str2);
		
		
		return dto;
	}
	
}
