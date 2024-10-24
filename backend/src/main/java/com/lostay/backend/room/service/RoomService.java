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
import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository roomRepo;
	
	@Autowired
	private ReviewRepository revRepo;

	
	// 호텔에 대한 객실 리스트 조회(호텔과 객실 정보)
	public List<RoomDTO> findHotelRoomList(long hotelNo, LocalDateTime checkInDate, LocalDateTime checkOutDate, int peopleMax) {

		LocalDateTime in = checkInDate.toLocalDate().atTime(15,0);
		LocalDateTime out = checkOutDate.toLocalDate().atTime(11,0);
		
		Period period = Period.between(checkInDate.toLocalDate(), checkOutDate.toLocalDate());
		
		List<Object[]> newRoom = roomRepo.findHotelRoomList(hotelNo, in, out);
		List<RoomDTO> dtos = new ArrayList<RoomDTO>();
		int reviewCount = revRepo.findHotelReviewCount(hotelNo);
		double ReviewAvg = revRepo.findHotelReviewAvg(hotelNo);
		
		for(Object[] r : newRoom) {
			RoomDTO d = new RoomDTO();
			d.setHotelNo((long)r[0]);
			d.setHotelName((String)r[1]);
			d.setHotelThumbnail((String)r[2]);
			String[] str = r[3].toString().split(",");
			d.setHotelImg(str);
			d.setHotelRating((String)r[4]);
			String[] str1 = r[5].toString().split(",");
			d.setHotelAmenities(str1);
			d.setHotelAdress((String)r[6]);
			d.setHotelTouristAttraction((String)r[7]);
			d.setHotelIntroduction((String)r[8]);
			d.setRoomNo((long)r[9]);
			d.setRoomCount((int)r[10]);
			d.setRoomName((String)r[11]);
			d.setRoomPeopleMax((int)r[12]);
			d.setRoomPeopleInfo((String)r[13]);
			d.setRoomThumbnail((String)r[14]);
			String[] str2 = r[15].toString().split(",");
			d.setRoomImg(str2);
			d.setRoomPrice((int)r[16]);
			d.setRoomDiscount((int)r[17]);
			int roomPrice = (int)r[16];
			int roomDiscount = (int)r[17];
			int discountPrice = (int)roomPrice - roomPrice * roomDiscount/100;
			d.setDiscountPrice(discountPrice);
			d.setRoomCheckinTime((LocalTime)r[18]);
			d.setRoomCheckoutTime((LocalTime)r[19]);
			d.setAvailableRooms((long)r[20]);
			d.setTotalReviewCount(reviewCount);
			d.setReviewAvg(ReviewAvg);
			d.setPeriod(period.getDays());
			d.setCheckInDay(checkInDate.toLocalDate());
			d.setCheckOutDay(checkOutDate.toLocalDate());
			
			
			
			dtos.add(d);
			
		}
		
		return dtos;
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
