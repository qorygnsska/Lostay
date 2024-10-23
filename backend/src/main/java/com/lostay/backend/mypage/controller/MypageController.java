package com.lostay.backend.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	@GetMapping("/mypageReview/{userNo}")
	public ResponseEntity<?> mypageReview(@PathVariable Long userNo, @RequestParam(required = false) Integer page) {

		log.info("mypageReview실행");
		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		if (page == null) {
			page = 0; // 기본값 설정
		}
		return new ResponseEntity<>(mypageService.mypageReview(userNo, page), HttpStatus.OK);
	}

	// mypage 내가 선택한 찜목록 조회
	@GetMapping("/mypageCartList/{userNo}")
	public ResponseEntity<?> mypageCartList(@PathVariable Long userNo, @RequestParam(required = false) Integer page) {
		log.info("mypageCartList실행");

		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		if (page == null) {
			page = 0; // 기본값 설정
		}
		return new ResponseEntity<>(mypageService.mypageCartList(userNo, page), HttpStatus.OK);

	}

	// mypage 유저 정보 닉네임 수정
	@PostMapping("/mypageUserInfo/{userNo}/nickname/{nickname}")
	public void mypageUserInfoNickName(@PathVariable Long userNo, @PathVariable("nickname") String nickname) {
		System.out.println("MypageController mypageUserInfoNickName실행");
		mypageService.userUpdateNicName(userNo, nickname);
	}

	@PostMapping("/mypageUserInfo/{userNo}/phone/{phone}")
	public void mypageUserInfoPhone(@PathVariable Long userNo, @PathVariable("phone") String phone) {
		System.out.println("MypageController mypageUserInfoPhone실행");
		mypageService.userUpdatePhone(userNo, phone);
	}

}
