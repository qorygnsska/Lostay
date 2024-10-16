package com.lostay.backend.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.event.service.EventService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class EventController {
	@Autowired
	private EventService eventService;
	
	//이벤트 전체 보기
	@GetMapping("/evnetList")
	 public ResponseEntity<?>evnetList(){
		log.info("eventController evnetList실행");
		return new ResponseEntity<>(eventService.findByAll(),HttpStatus.OK);

	}
	
}
