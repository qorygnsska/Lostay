package com.lostay.backend.adminpage.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lostay.backend.adminpage.dto.AdminEventDTO;
import com.lostay.backend.adminpage.service.AdminService;
import com.lostay.backend.hotel.controller.HotelController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class AdminController {

	@Autowired
	AdminService adminService;
	
	
	//이벤트 전체 조회(1024 JIP)
	@GetMapping("/adminEventList")
	public ResponseEntity<?> adminEventList(@RequestParam(defaultValue = "") String eventTitle, @RequestParam(defaultValue = "1") int page) {
		//System.out.println("AdminCont.adminEventList()");
		//System.out.println("searchValue(title): " + eventTitle + " /page: " + page);
		
		//요청받은 페이지 인덱스는 0부터: page-1 
		return new ResponseEntity<>(adminService.getEventList(eventTitle, page-1), HttpStatus.OK);
	}
	
	//이벤트 단일 조회(1024 JIP)
	@GetMapping("/adminEventDetail")
	public ResponseEntity<?> adminEventDetail(Long eventNo) {
		
		return new ResponseEntity<>(adminService.getEventDetail(eventNo), HttpStatus.OK);
	}
	
	
	//이벤트 전체 조회(1025 JIP)
	@PostMapping("/adminEvent")
	public ResponseEntity<?> postAdminEvent(@RequestParam String eventTitle, @RequestParam LocalDateTime eventCreateAt, @RequestParam MultipartFile eventImg) {
		
		System.out.println("AdminCont.postAdminEvent()");
//		System.out.println(dto);
		System.out.println(eventTitle);
		System.out.println(eventCreateAt);
//		System.out.println(dto.getEventEndAt());
//		System.out.println(dto.getEventThumbnail());
		System.out.println(eventImg);


		//요청받은 페이지 인덱스는 0부터: page-1 
		//return new ResponseEntity<>(adminService.getEventList(eventTitle, page-1), HttpStatus.OK);
		return null;
	}
	
	
	@PutMapping("/adminEvent")
	public ResponseEntity<?> putAdminEvent(String eventTitle, 
			LocalDateTime eventCreateAt, LocalDateTime eventEndAt, 
			String eventThumbnail, String eventImg) {
		System.out.println("AdminCont.putAdminEvent()");
		System.out.println(eventTitle + "/" + eventCreateAt + "/" + eventEndAt + "/" + eventThumbnail + "/" + eventImg);
		
		//요청받은 페이지 인덱스는 0부터: page-1 
		//return new ResponseEntity<>(adminService.getEventList(eventTitle, page-1), HttpStatus.OK);
		return null;
	}
	
	
	
	
	
	
	
	
	
	
	//유저가 작성한 리뷰 조회
	@GetMapping("/adminReview") 
	public ResponseEntity<?> adminReview(@RequestParam(required = false) String userName,@RequestParam(required = false) Integer page){
		log.info("AdminController adminReview실행");
		System.out.println("유저이름"+ userName);
		
		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		if (page == null) {
			page = 0; // 기본값 설정
		}
		return new ResponseEntity<>(adminService.adminReview(userName,page),HttpStatus.OK);
	}
	
	
	// 유저가 작성한 리뷰 제재
	@PostMapping("/adminUserReviewDel")
	public void adminUserReviewDel(@RequestParam Long reviewNo,@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate reviewSanctionsAt ) {
		 System.out.println("AdminController adminUserReviewDel실행");
		 adminService.updateById(reviewNo,reviewSanctionsAt);
	} 
	
	
	//유저 조회
	@GetMapping("/adminUserSearch") 
	public ResponseEntity<?> adminUserSearch(@RequestParam(required = false) String userName,@RequestParam(required = false) Integer page){
		log.info("AdminController adminUserSearch실행");
		System.out.println("유저이름"+ userName);
		
		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		if (page == null) {
			page = 0; // 기본값 설정
		}
		return new ResponseEntity<>(adminService.adminUserSearch(userName,page),HttpStatus.OK);
	}
	

	
	
}


