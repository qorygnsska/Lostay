package com.lostay.backend.main.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.lostay.backend.event.dto.EventDTO;
import com.lostay.backend.event.entity.Event;
import com.lostay.backend.event.repository.EventRepository;
import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.location.dto.LocationDTO;
import com.lostay.backend.location.entity.Location;
import com.lostay.backend.location.repository.LocationRepository;

@Service
public class MainService {

	@Autowired
	private HotelRepository hotelRepo;
	@Autowired
	private LocationRepository locationRepo;
	@Autowired
	private EventRepository eventRepo;
	
	public List<HotelDTO> hotels() {
		
	
		return null;
	}

	public List<LocationDTO> locationFindAll() {
		List<Location> locationentity= locationRepo.findAll();
		List<LocationDTO>locationDTOList= new ArrayList<LocationDTO>();
		for(Location location:locationentity) {
			LocationDTO dto= new LocationDTO();
			dto.setLocationImage(location.getLocationImage());
			dto.setLocationName(location.getLocationName());
			dto.setLocationNo(location.getLocationNo());
			locationDTOList.add(dto);
		}
		return locationDTOList ;
	}

	public Object eventFindAll() {
		List<Event> eventEntity=eventRepo.findAll();
		List<EventDTO>eventDTOList= new ArrayList<EventDTO>();
		for(Event e:eventEntity) {
			EventDTO dto = new EventDTO();
			dto.setEventNo(e.getEventNo());
			dto.setEventTitle(e.getEventTitle());
			dto.setEventImg(e.getEventImg().split(","));
			dto.setEventThumbnail(e.getEventThumbnail());
			dto.setEventCreateAt(e.getEventCreateAt());
			dto.setEventEndAt(e.getEventEndAt());
			eventDTOList.add(dto);
			
		}
		return eventDTOList;
	}

	public Object findTop10HtolesRating() {
		  PageRequest pageable = PageRequest.of(0, 10); // 첫 페이지에서 10개 항목 가져오기
		    List<Object[]> results = hotelRepo.findTop10Hotels(pageable);
		    List<HotelDTO> hotelDTOList=new ArrayList<HotelDTO>();
		    double num=0.01;
		    for (Object[] result : results) {
		    	HotelDTO dto= new HotelDTO();
		        dto.setHotelNo((Long) result[0]);
		        dto.setHotelRating((String) result[1]);
		        dto.setHotelName((String)result[2]);
		        dto.setReviewRating((Double) result[3]);	        
		        dto.setTotalReviewCount((Long) result[4]);
		        dto.setRoomDiscount((Double) result[5]+ "%");
		        dto.setRoomPrice((int) result[6]);
		        int roomPrice = (int) result[6]; // 원래 가격
		        double roomDiscount = (double) result[5]; // 할인율
		        // 할인된 가격 계산
		        int discountedPrice = (int) (roomPrice * (1 - (roomDiscount * num)));
		        // DTO에 할인된 가격 설정
		        dto.setRoomDcPrice(discountedPrice);
		        hotelDTOList.add(dto);
		        }
		return hotelDTOList;
	}

}
