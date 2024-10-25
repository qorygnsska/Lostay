package com.lostay.backend.adminpage.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.adminpage.dto.AdminEventDTO;
import com.lostay.backend.adminpage.service.TestService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class TestController {

	@Autowired
	private TestService adminService;
	
	
	//이벤트 전체 조회(1025 JIP)
	@PostMapping("/adminEvent")
	public ResponseEntity<?> postAdminEvent(@RequestBody AdminEventDTO dto) {
		
		System.out.println("tesetCont.postAdminEvent()");
		System.out.println(dto);
		System.out.println(dto.getEventTitle());
		System.out.println(dto.getEventCreateAt());
		System.out.println(dto.getEventEndAt());
		System.out.println(dto.getEventThumbnail());
		System.out.println(dto.getEventImg());


		//요청받은 페이지 인덱스는 0부터: page-1 
		//return new ResponseEntity<>(adminService.getEventList(eventTitle, page-1), HttpStatus.OK);
		return null;
	}
	
	
	@PutMapping("/adminEvent")
	public ResponseEntity<?> putAdminEvent(String eventTitle, 
			LocalDateTime eventCreateAt, LocalDateTime eventEndAt, 
			String eventThumbnail, String eventImg) {
		System.out.println("tesetCont.putAdminEvent()");
		System.out.println(eventTitle + "/" + eventCreateAt + "/" + eventEndAt + "/" + eventThumbnail + "/" + eventImg);
		
		//요청받은 페이지 인덱스는 0부터: page-1 
		//return new ResponseEntity<>(adminService.getEventList(eventTitle, page-1), HttpStatus.OK);
		return null;
	}
	
	
}
