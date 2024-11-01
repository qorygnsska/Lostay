package com.lostay.backend.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.event.service.EventService;
import com.lostay.backend.main.service.MainService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/event")
public class EventController {
	@Autowired
	private EventService eventService;

	@Autowired
	private MainService mainService;
	
	//이벤트 전체 보기
	@GetMapping("/List")//변경전: /eventList 변경후:/event/List
	 public ResponseEntity<?>eventList(){
		//log.info("eventController eventList실행");
		return new ResponseEntity<>(mainService.eventFindAll(),HttpStatus.OK);

	}
	
	//이벤트 상세 보기
	@GetMapping("/Detail/{eventNo}") //이벤트 상세 정보 변경전: /eventDetail/{eventNo} 변경후:/event/Detail/{eventNo}
	public ResponseEntity<?>eventDetail(@PathVariable Long eventNo){
		//log.info("eventController eventDetail실행");//로그 수정 1023 JIP
		return new ResponseEntity<>(eventService.findByEventId(eventNo),HttpStatus.OK);
	}
	
	
	
	
}
