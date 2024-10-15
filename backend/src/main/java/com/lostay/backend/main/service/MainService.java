package com.lostay.backend.main.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

}
