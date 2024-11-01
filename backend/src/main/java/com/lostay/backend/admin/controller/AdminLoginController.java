package com.lostay.backend.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.admin.service.AdminLoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminLoginController {
	
	@Autowired
	private final AdminLoginService adminService;

	@PostMapping("/login") // 변경전 /login-admin  변경후/admin/login
	public ResponseEntity<?> loginAdmin(@RequestBody HashMap<String, Object> data, HttpServletResponse response){
		Map<String, Object> map = data;
		String id = (String) map.get("id");
		String pw = (String) map.get("pw");
		System.out.println(id+pw);
		return new ResponseEntity<>(adminService.loginAdmin(id, pw, response ), HttpStatus.OK);
	}
}
