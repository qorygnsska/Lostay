package com.lostay.backend.point.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.lostay.backend.hotel.controller.HotelController;
import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.point.service.PointService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@CrossOrigin
public class PointController {

	
	@Autowired
	private PointService pointService;
	

	@GetMapping("/pointList") //유저 포인트 내역 조회
	public ResponseEntity<?>pointList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,@RequestParam() int monthNum){
		//@PathVariable("userNo") Long userNo
		Long userNo = customOAuth2User.getUserNo();
		log.info("pointList실행");
		return new ResponseEntity<>(pointService.pointList(userNo,monthNum),HttpStatus.OK);
	}
	
}
