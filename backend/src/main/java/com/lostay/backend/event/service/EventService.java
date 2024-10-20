package com.lostay.backend.event.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.event.repository.EventRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EventService {

	@Autowired
	private EventRepository eventRepo;
	
	public Object findByAll() {
			log.info("eventService findByAll() 실행");
		return eventRepo.findAll();
	}

}
