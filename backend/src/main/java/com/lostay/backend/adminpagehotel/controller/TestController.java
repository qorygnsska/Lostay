package com.lostay.backend.adminpagehotel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.adminpagehotel.service.TestService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class TestController {

	@Autowired
	private	TestService service;
	
	@GetMapping("/adminhotelsList")
	public ResponseEntity<?> adminEventList(@RequestParam(defaultValue = "1") int page) {
		
		return new ResponseEntity<>(service.getHotels(page-1), HttpStatus.OK);
	}
	
	
}
