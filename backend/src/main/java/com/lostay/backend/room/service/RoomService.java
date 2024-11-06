package com.lostay.backend.room.service;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.DataType;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.redis.repository.RoomRedisRepository;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.dto.RoomCheckDTO;
import com.lostay.backend.room.dto.RoomCustomDTO;
import com.lostay.backend.room.dto.RoomDTO;
import com.lostay.backend.room.dto.RoomListDTO;
import com.lostay.backend.room.dto.RoomListHotelInfoDTO;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.entity.RoomCheck;
import com.lostay.backend.room.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private ReviewRepository revRepo;

	@Autowired
	private HotelRepository hotelRepo;

	@Autowired
	private RoomRedisRepository roomRedisRepo;

	@Autowired
	private RedisTemplate<String, RoomCheck> redisTemplate;

	// 호텔에 대한 객실 리스트 조회(호텔과 객실 정보)
	public RoomListDTO findHotelRoomList(Long hotelNo, LocalDateTime checkInDate, LocalDateTime checkOutDate,
			int peopleMax) {

		LocalDateTime in = checkInDate;
		LocalDateTime out = checkOutDate;

		long period = ChronoUnit.DAYS.between(checkInDate.toLocalDate(), checkOutDate.toLocalDate());
//		Period period = Period.between(checkInDate.toLocalDate(), checkOutDate.toLocalDate());

//		List<Object[]> newRoom = roomRepo.findHotelRoomList(hotelNo, in, out);
		RoomListHotelInfoDTO Hoteldto = roomRepo.findHotelInfo(hotelNo);
		List<RoomCustomDTO> list = roomRepo.findRoomCumstomList(hotelNo, in, out);

//		List<RoomDTO> dtos = new ArrayList<RoomDTO>();
//		
//		int reviewCount = revRepo.findHotelReviewCount(hotelNo);
//		Double ReviewAvg = revRepo.findHotelReviewAvg(hotelNo);

//		if (ReviewAvg == null) {
//			ReviewAvg = 0.0;
//		}

		RoomListDTO dto = new RoomListDTO(Hoteldto, in.toLocalDate(), out.toLocalDate(), period, list);
////		
//		dto.setPeriod(period.getDays());
//		dto.setCheckInDay(in.toLocalDate());
//		dto.setCheckOutDay(out.toLocalDate());
////		dto.setReviewAvg(ReviewAvg);
////		dto.setTotalReviewCount(reviewCount);
//		dto.setList(list);
//		
		System.out.println("테스트" + dto.getDto().getHotelThumbnail());

		return dto;
	}

	// 해당 객실에 대한 정보 조회
	public RoomDTO findRoomInfo(long roomNo, LocalDateTime checkInDate, LocalDateTime checkOutDate, int peopleMax) {

		Optional<Room> newRoom2 = roomRepo.findById(roomNo);
		Room room2 = newRoom2.get();

		long period = ChronoUnit.DAYS.between(checkInDate.toLocalDate(), checkOutDate.toLocalDate());

		Long hotelNo = room2.getHotel().getHotelNo();

		List<RoomCustomDTO> list = roomRepo.findRoomCumstomList(hotelNo, checkInDate, checkOutDate);
		Long avc = 0L;

		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getRoomNo() == roomNo) {
				avc = list.get(i).getAvailableRooms();
			}
		}
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
		int discountPrice = (int) roomPrice - roomPrice * roomDiscount / 100;
		dto.setDiscountPrice(discountPrice);
		dto.setCheckInDay(checkInDate.toLocalDate());
		dto.setCheckOutDay(checkOutDate.toLocalDate());
		dto.setSearchPeople(peopleMax);
		String[] str2 = room.getRoomImg().split(",");
		dto.setRoomImg(str2);
		dto.setHotelAdress(room.getHotel().getHotelAdress());
		dto.setAvailableRooms(avc);
		dto.setPeriod(period);
		dto.setRoomThumbnail(room.getRoomThumbnail());

		return dto;
	}

	public Long findAvailableCount(RoomCheckDTO dto) {

		LocalDateTime in = dto.getCheckInDay().atTime(15, 0, 0);
		LocalDateTime out = dto.getCheckOutDay().atTime(11, 0, 0);
		Long roomNo = dto.getRoomNo();
		Long count = roomRepo.findAvailableCount(roomNo, in, out);

		return count;
	}
	


//    // 레디스에 값이 있는지 찾아오는거
//	public RoomCheckDTO findRedisInfo(Long roomNo,LocalDateTime in,LocalDateTime out) {
//		
//		List<RoomCheck> newRoom = roomRedisRepo.findByRoomNoAndCheckInDayLessThanAndCheckOutDayGreaterThan
//				(roomNo,in,out);
//		
//	    
//
//		
//	}

	// 업데이트 및 저장
	public RoomCheckDTO RedisSave(Long roomNo, LocalDate in, LocalDate out) {

		RoomCheck ch = new RoomCheck();

		ch.setRoomNo(roomNo);
		ch.setCheckInDay(in);
		ch.setCheckOutDay(out);

		roomRedisRepo.save(ch);

		RoomCheckDTO c1 = new RoomCheckDTO(ch.getRid(), ch.getRoomNo(), ch.getCheckInDay(), ch.getCheckOutDay());

		return c1;
	}

	// 레디스에서 roomCheck:123214354738483598327984 통해서 값 가져오기
	public Optional<RoomCheck> getRoomCheck(String rid) {
		HashOperations<String, String, RoomCheck> hashOperations = redisTemplate.opsForHash();
		RoomCheck roomCheck = hashOperations.get("roomCheck", rid);
		return Optional.ofNullable(roomCheck);
	}

	// redis에 해당하는 값을 가진 사람이 몇명 있는지
	public int findRedisHumanCount(RoomCheckDTO dto) {
		String ping = redisTemplate.getConnectionFactory().getConnection().ping();
		System.out.println("Redis connection: " + ping); // true가 출력되어야 함

		Set<String> keys = redisTemplate.keys("*");
		List<String> redisKey = new ArrayList<String>();
		for (String value : keys) {
			if (value.length() > 9) {
				if (value.substring(0, 10).equals("roomCheck:")) {
					redisKey.add(value.substring(10));
					System.out.println("keys : " + value);

				}
			}
		}

		int totalCount = 0;

		if (redisKey != null) {
			for (String key : redisKey) {
				System.out.println("여기서 출력되니?" + key.toString());

				System.out.println("이 부분 왜 출력이 안되는거야? : " + key);
				System.out.println("총 카운트가 몇이야 ? " + totalCount);
				Optional<RoomCheck> roomCheck = roomRedisRepo.findById(Long.parseLong(key));
				if (roomCheck != null) {
					// 각 필드를 가져오기 (예: "roomNo", "checkInDay", "checkOutDay")
					Long roomNo = roomCheck.get().getRoomNo();
					LocalDate checkInDay = (roomCheck.get().getCheckInDay());
					LocalDate checkOutDay = (roomCheck.get().getCheckOutDay());

					// 비교 로직
					if (roomNo.equals(dto.getRoomNo()) && checkInDay.isBefore(dto.getCheckOutDay())
							&& checkOutDay.isAfter(dto.getCheckInDay())) {
						totalCount += 1;
					}
				}
			}
		} else {
			System.out.println("키가 널인거야? 말이 안되는데");
		}

		return totalCount;
	}

}
