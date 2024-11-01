package com.lostay.backend.sms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.sms.service.SmsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sms")
public class SmsController {

	
	@Autowired
	private final SmsService smsService;
	
	@PostMapping("/loginPhone/{phonenum}")//변경전: /loginPhone/{phonenum} 변경후:/sms/loginPhone/{phonenum}
	public ResponseEntity<?> loginPhone(@PathVariable("phonenum") String phoneNum) {
		System.out.println("loginPhone Controller 탐");
		System.out.println("phoneNum"+phoneNum);
		return new ResponseEntity<>(smsService.sendSms(phoneNum),HttpStatus.OK);
	}
}
