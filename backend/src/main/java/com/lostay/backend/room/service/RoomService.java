package com.lostay.backend.room.service;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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
	public List<RoomDTO> findHotelRoomList(long hotelNo, LocalDateTime checkInDate, LocalDateTime checkOutDate) {

		LocalDateTime in = checkInDate.toLocalDate().atTime(15,0);
		LocalDateTime out = checkOutDate.toLocalDate().atTime(11,0);
		
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
			d.setRoomCheckinTime((LocalTime)r[18]);
			d.setRoomCheckoutTime((LocalTime)r[19]);
			d.setAvailableRooms((long)r[20]);
			d.setReviewCount(reviewCount);
			d.setReviewAvg(ReviewAvg);
			
			dtos.add(d);
			
		}
		
		return dtos;
	}
	
}