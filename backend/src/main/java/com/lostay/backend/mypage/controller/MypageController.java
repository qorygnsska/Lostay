package com.lostay.backend.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.event.controller.EventController;
import com.lostay.backend.mypage.service.MypageService;
import com.lostay.backend.oauth2.service.CustomOAuth2User;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class MypageController {

	@Autowired
	MypageService mypageService;
	
	//mypage 조회
	@GetMapping("/mypage") 
	public ResponseEntity<?>mypage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){
		log.info("mypage실행");
		
//		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		    
//	    // 2. Authentication 객체에서 Principal(현재 사용자 정보) 가져오기
//	    CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//	    
//	    // 3. userNo 가져오기
//	    Long userNo = customOAuth2User.getNo();
		
		Long userNo = customOAuth2User.getNo();
		System.out.println("UserNo = " + userNo);

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
	
	
	
	
}
