package com.lostay.backend.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.mypage.service.MypageService;
import com.lostay.backend.oauth2.service.CustomOAuth2User;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class MypageController {

	@Autowired
	MypageService mypageService;

	// mypage 조회
	@GetMapping("/mypage")
	public ResponseEntity<?> mypage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		log.info("mypage실행");

		Long userNo = customOAuth2User.getUserNo();

		return new ResponseEntity<>(mypageService.myPageInfo(userNo), HttpStatus.OK);
	}

	// mypage 내가 작성한 리뷰 조회
	@GetMapping("/mypageReview")
	public ResponseEntity<?> mypageReview(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam(required = false) Integer page) {

		Long userNo = customOAuth2User.getUserNo();

		log.info("mypageReview실행");
	
		return new ResponseEntity<>(mypageService.mypageReview(userNo, page), HttpStatus.OK);
	}

	// mypage 내가 선택한 찜목록 조회
	@GetMapping("/mypageCartList")
	public ResponseEntity<?> mypageCartList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam(required = false) Integer page) {
		log.info("mypageCartList실행");

		Long userNo = customOAuth2User.getUserNo();

		return new ResponseEntity<>(mypageService.mypageCartList(userNo, page), HttpStatus.OK);

	}

	// mypage 유저 정보 닉네임 수정
	@PutMapping("/mypageUserInfo/nickname/{nickname}")
	public  ResponseEntity<?> mypageUserInfoNickName(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @PathVariable("nickname") String nickname) {
		Long userNo = customOAuth2User.getUserNo();
		System.out.println("MypageController mypageUserInfoNickName실행");
		boolean result = mypageService.userUpdateNicName(userNo, nickname);

		if (result) {
			return new ResponseEntity<>("성공", HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}
	
	
	//mypage 유저 정보 전화번호 수정
	@PostMapping("/mypageUserInfo/phone/{phone}")
	public void mypageUserInfoPhone(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @PathVariable("phone") String phone) {
		Long userNo = customOAuth2User.getUserNo();
		System.out.println("MypageController mypageUserInfoPhone실행");
		mypageService.userUpdatePhone(userNo, phone);
	}
	
	//mypage 유저 정보수정화면 출력(값넘어오는거 확인함)
	@GetMapping("/mypageEdit")
	public ResponseEntity<?> mypageEdit(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		log.info("mypageEdit실행");

		Long userNo = customOAuth2User.getUserNo();

		return new ResponseEntity<>(mypageService.myPageInfoEdit(userNo), HttpStatus.OK);
	}
	
	
}
