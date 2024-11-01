package com.lostay.backend.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.event.dto.EventDTO;
import com.lostay.backend.event.entity.Event;
import com.lostay.backend.event.repository.EventRepository;
import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.location.dto.LocationDTO;
import com.lostay.backend.location.entity.Location;
import com.lostay.backend.location.repository.LocationRepository;

@Service
@Transactional
public class MainService {

	@Autowired
	private HotelRepository hotelRepo;
	@Autowired
	private LocationRepository locationRepo;
	@Autowired
	private EventRepository eventRepo;

	// 국내 인기 여행지 8지역
	public List<LocationDTO> locationFindAll() {
		List<Location> locationentity = locationRepo.findAll();
		List<LocationDTO> locationDTOList = new ArrayList<LocationDTO>();
		for (Location location : locationentity) {
			LocationDTO dto = new LocationDTO();
			dto.setLocationImage(location.getLocationImage());
			dto.setLocationName(location.getLocationName());
			dto.setLocationNo(location.getLocationNo());
			locationDTOList.add(dto);
		}
		return locationDTOList;
	}

	// 이벤트 조회
	public Object eventFindAll() {
		List<Event> eventEntity = eventRepo.findAll();
		List<EventDTO> eventDTOList = new ArrayList<EventDTO>();
		for (Event e : eventEntity) {
			EventDTO dto = new EventDTO();
			dto.setEventNo(e.getEventNo());
			dto.setEventTitle(e.getEventTitle());
			dto.setEventThumbnail(e.getEventThumbnail());
			dto.setEventCreateAt(e.getEventCreateAt());
			dto.setEventEndAt(e.getEventEndAt());
			eventDTOList.add(dto);

		}
		return eventDTOList;
	}

	// 특가 호텔 조회
	public Object findTop10HtolesDiscount() {
		PageRequest pageable = PageRequest.of(0, 10); // 첫 페이지에서 10개 항목 가져오기
		List<Object[]> results = hotelRepo.findTop10HtolesDiscount(pageable);
		List<HotelDTO> hotelDTOList = new ArrayList<HotelDTO>();
		double num = 0.01;
		for (Object[] result : results) {
			HotelDTO dto = new HotelDTO();
			dto.setHotelNo((Long) result[0]);
			dto.setHotelRating((String) result[1]);
			dto.setHotelName((String) result[2]);
			dto.setReviewRating((Double) result[3]);
			dto.setTotalReviewCount((Long) result[4]);
			dto.setRoomDiscount((int) result[5]);
			dto.setRoomPrice((int) result[6]);
			int roomPrice = (int) result[6]; // 원래 가격
			int roomDiscount = (int) result[5]; // 할인율
			// 할인된 가격 계산
			int discountedPrice = (int) (roomPrice * (1 - (roomDiscount * num)));
			// DTO에 할인된 가격 설정
			dto.setRoomDcPrice(discountedPrice);
			dto.setHotelThumbnail((String) result[7]);
			hotelDTOList.add(dto);
		}
		return hotelDTOList;
	}

	// 인기 호텔 조회
	public Object findTop10HtolesRating() {
		PageRequest pageable = PageRequest.of(0, 10); // 첫 페이지에서 10개 항목 가져오기
		List<Object[]> results = hotelRepo.findTop10HotHotels(pageable);
		List<HotelDTO> hotHotelDTOList = new ArrayList<HotelDTO>();
		double num = 0.01;
		for (Object[] result : results) {
			HotelDTO dto = new HotelDTO();
			dto.setHotelNo((Long) result[0]);
			dto.setHotelRating((String) result[1]);
			dto.setHotelName((String) result[2]);
			dto.setReviewRating((Double) result[3]);
			dto.setTotalReviewCount((Long) result[4]);
			dto.setRoomDiscount((int) result[5]);
			dto.setRoomPrice((int) result[6]);
			int roomPrice = (int) result[6]; // 원래 가격
			int roomDiscount = (int) result[5]; // 할인율
			// 할인된 가격 계산
			int discountedPrice = (int) (roomPrice * (1 - (roomDiscount * num)));
			// DTO에 할인된 가격 설정
			dto.setRoomDcPrice(discountedPrice);
			dto.setHotelThumbnail((String) result[7]);
			hotHotelDTOList.add(dto);
		}
		return hotHotelDTOList;
	}

	// 여행지별 숙소
	public Object findByHotelAddressContaining() {
		
		//String[] locations = {"서울", "제주도", "부산", "인천", "대전", "대구", "광주", "울산"};
		String[] locations = {"서울", "제주도", "부산", "광주", "인천", "울산"};
		
		Pageable pageable = PageRequest.of(0, 6); // 0번째 페이지, 6개 항목
		
		List<Object> finalResult = new ArrayList<>();
		
		for(String location : locations){
			List<Object[]> results = hotelRepo.findByHotelAddressContaining(location, pageable);
			List<HotelDTO> tripHotelDTOList = new ArrayList<>();	
			Map<String, Object> locationHotels = new HashMap<>();
			
			double num = 0.01;
			for (Object[] result : results) {
				HotelDTO dto = new HotelDTO();
				dto.setHotelNo((Long) result[0]);
				dto.setHotelRating((String) result[1]);
				dto.setHotelName((String) result[2]);
				dto.setReviewRating((Double) result[3]);
				dto.setTotalReviewCount((Long) result[4]);
				dto.setRoomDiscount((int) result[5]);
				dto.setRoomPrice((int) result[6]);
				int roomPrice = (int) result[6]; // 원래 가격
				int roomDiscount = (int) result[5]; // 할인율
				// 할인된 가격 계산
				int discountedPrice = (int) (roomPrice * (1 - (roomDiscount * num)));
				// DTO에 할인된 가격 설정
				dto.setRoomDcPrice(discountedPrice);
				dto.setHotelThumbnail((String) result[7]);
				tripHotelDTOList.add(dto);
			}
			
			locationHotels.put("id", location.hashCode()); // ID는 해시 코드로 예시
            locationHotels.put("location", location);
            locationHotels.put("hotelList", tripHotelDTOList);
            finalResult.add(locationHotels);
		}
	
		return finalResult;

	}

}
