package com.lostay.backend.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
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
	@GetMapping("/mypageReview/{userNo}") 
	public ResponseEntity<?>mypageReview(@PathVariable Long userNo,@RequestParam(required = false) Integer page){
		
		log.info("mypageReview실행");
		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
	    if (page == null) {
	        page = 0; // 기본값 설정
	    }
		return new ResponseEntity<>(mypageService.mypageReview(userNo,page),HttpStatus.OK);
	}
	
	
	//mypage 내가 선택한 찜목록 조회
	@GetMapping("/mypageCartList/{userNo}")
	public ResponseEntity<?>mypageCartList(@PathVariable Long userNo,@RequestParam(required = false) Integer page){
		log.info("mypageCartList실행");
		
		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
	    if (page == null) {
	        page = 0; // 기본값 설정
	    }
		return new ResponseEntity<>(mypageService.mypageCartList(userNo,page),HttpStatus.OK);

	}
	
}
