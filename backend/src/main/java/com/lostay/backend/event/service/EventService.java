package com.lostay.backend.event.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.event.dto.EventDTO;
import com.lostay.backend.event.entity.Event;
import com.lostay.backend.event.repository.EventRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class EventService {

	@Autowired
	private EventRepository eventRepo;
	

	public Object findByEventId(Long eventNo) {
		log.info("eventService findByEventId() 실행");
		Optional<Event> eventEntity=eventRepo.findById(eventNo);
		List<EventDTO>eventDTOList= new ArrayList<EventDTO>();
			EventDTO dto = new EventDTO();
			dto.setEventNo(eventEntity.get().getEventNo());
			dto.setEventTitle(eventEntity.get().getEventTitle());
			dto.setEventImg(eventEntity.get().getEventImg().split(","));
			dto.setEventCreateAt(eventEntity.get().getEventCreateAt());
			dto.setEventEndAt(eventEntity.get().getEventEndAt());
			eventDTOList.add(dto);
		return eventDTOList;
	}

	
	
	
	
}
