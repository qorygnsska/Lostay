package com.lostay.backend.point.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.lostay.backend.hotel.controller.HotelController;
import com.lostay.backend.point.service.PointService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@CrossOrigin
public class PointController {

	
	@Autowired
	private PointService pointService;
	
	@GetMapping("/pointList/{userNo}") 
	public ResponseEntity<?>pointList(@PathVariable Long userNo){
		log.info("pointList실행");
		return new ResponseEntity<>(pointService.pointList(userNo),HttpStatus.OK);
	}
	
}
