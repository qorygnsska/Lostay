package com.lostay.backend.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.main.service.MainService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin
public class MainController {

	@Autowired
	private MainService mainService;
	
	@PostMapping("main")
	public ResponseEntity<?>mainPage(){
		log.info("mainPage실행");
		return new ResponseEntity<>(mainService.hotels(),HttpStatus.OK);
	}
	
	
}
