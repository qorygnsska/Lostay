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

		boolean result = adminService.loginAdmin(id, pw, response);
		
		if(result) {
			return new ResponseEntity<>(HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logoutAdmin() {
		//OAuth2가 없는데 뭘 받아와서 넘겨주나? adminEntity를 어떻게 확인함?
		
		boolean result = adminService.logoutAdmin();
		
		if(result) {
			return ResponseEntity.ok("Log-out_admin_SUCCESS");
		} else {
			return ResponseEntity.notFound().build(); //code: 404
		}
		
	}
	
	
		
		
}
