package com.lostay.backend.cart.controller;

import java.util.Optional;

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

import com.lostay.backend.cart.dto.CartDTO;
import com.lostay.backend.cart.entity.Cart;
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
	 public ResponseEntity<?> cartdelete(@RequestParam Long cartNo) {
		 System.out.println("CartController cartdelete실행");
	      Boolean result= cartService.deleteById(cartNo);
	        
	        if(result) {
	        	return new ResponseEntity<>(HttpStatus.OK);
	        } else {
				return ResponseEntity.notFound().build();// code 404
			}
	        
	        
	        
} 
	 
	 
	 //호텔 찜 선택 체크 조회(jh)
	 @GetMapping("/HotelCheckCart")
		public ResponseEntity<?> HotelCheckCart(@RequestParam Long userNo, @RequestParam Long hotelNo) {
		 //@AuthenticationPrincipal CustomOAuth2User customOAuth2User
		 //long userNo = customOAuth2User.getUserNo();

		CartDTO cartno = cartService.HotelCheckCart(userNo,hotelNo);
			if (cartno !=null) {
				return new ResponseEntity<>(cartno.getCartNo(), HttpStatus.OK);
			} else {
				return ResponseEntity.notFound().build();// code 404
			}
		} 
	 
	 
}
