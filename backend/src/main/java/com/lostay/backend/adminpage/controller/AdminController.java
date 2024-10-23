package com.lostay.backend.adminpage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.lostay.backend.adminpage.service.AdminService;
import com.lostay.backend.hotel.controller.HotelController;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@CrossOrigin
public class AdminController {

	@Autowired
	AdminService adminService;
	
	//유저가 작성한 리뷰 조회
	@GetMapping("/adminReview") //유저 포인트 내역 조회
	public ResponseEntity<?>adminReview(@RequestParam(required = false) String userName,@RequestParam(required = false) Integer page){
		log.info("AdminController adminReview실행");
		System.out.println("유저이름"+ userName);
		
		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		if (page == null) {
			page = 0; // 기본값 설정
		}
		return new ResponseEntity<>(adminService.adminReview(userName,page),HttpStatus.OK);
	}
	
	
	
}
