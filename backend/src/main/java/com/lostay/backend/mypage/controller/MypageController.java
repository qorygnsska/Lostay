package com.lostay.backend.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.event.controller.EventController;
import com.lostay.backend.mypage.service.MypageService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class MypageController {

	@Autowired
	MypageService mypageService;
	
	//mypage 조회
	@GetMapping("/mypage/{userNo}") 
	public ResponseEntity<?>mypage(@PathVariable Long userNo){
		log.info("mypage실행");
		return new ResponseEntity<>(mypageService.myPageInfo(userNo),HttpStatus.OK);
	}
	
	//mypage 내가 작성한 리뷰 조회
	@GetMapping("/mypage/{userNo}/{page}") 
	public ResponseEntity<?>mypageReview(@PathVariable Long userNo,@PathVariable int page){
		log.info("mypageReview실행");
		return new ResponseEntity<>(mypageService.mypageReview(userNo,page),HttpStatus.OK);
	}
	
	
	
	
}
