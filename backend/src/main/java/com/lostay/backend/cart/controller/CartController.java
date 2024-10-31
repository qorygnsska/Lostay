package com.lostay.backend.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.cart.service.CartService;
import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.point.controller.PointController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class CartController {
   
	@Autowired
	private CartService cartService;
	//내가 선택한 찜 호텔 저장
	 @PostMapping("/cartsave")
	 public ResponseEntity<?> createCart(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam Long hotelId) {
		 
		 	long userNo = customOAuth2User.getUserNo();
//		 	long userId = 1L;        
	 return new ResponseEntity<>(cartService.cartsave(userNo, hotelId), HttpStatus.OK);
}
	 
		//내가 선택한 찜 호텔 삭제
	 @PostMapping("/cartdelete")
	 public void cartdelete(@RequestParam Long cartNo) {
		 System.out.println("CartController cartdelete실행");
	        cartService.deleteById(cartNo);
} 
	 
	 
	 //호텔 찜 선택 체크 조회(jh)
	 @GetMapping("/HotelCheckCart")
		public ResponseEntity<?> HotelCheckCart(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam Long hotelNo) {
		 long userNo = customOAuth2User.getUserNo();

			boolean result = cartService.HotelCheckCart(userNo,hotelNo);
			if (result) {
				return new ResponseEntity<>("Hotel Cart True", HttpStatus.OK);
			} else {
				return ResponseEntity.notFound().build();// code 404
			}
		} 
	 
	 
}
