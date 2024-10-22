package com.lostay.backend.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.cart.service.CartService;
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
	 public void createCart(@RequestParam Long userId, @RequestParam Long hotelId) {
	        cartService.cartsave(userId, hotelId);
}
	 
		//내가 선택한 찜 호텔 삭제
	 @PostMapping("/cartdelete")
	 public void cartdelete(@RequestParam Long cartNo) {
		 System.out.println("CartController cartdelete실행");
	        cartService.deleteById(cartNo);
} 
	 
}