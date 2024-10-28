package com.lostay.backend.adminpage.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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

	// 이벤트 전체 조회(1024 JIP)
	@GetMapping("/adminEventList")
	public ResponseEntity<?> adminEventList(boolean onGoing, 
			@RequestParam(defaultValue = "") String eventTitle,
			@RequestParam(defaultValue = "1") int page) {
		// System.out.println("AdminCont.adminEventList()");
		// System.out.println("searchValue(title): " + eventTitle + " /page: " + page);

		// 요청받은 페이지 인덱스는 0부터: page-1
		return new ResponseEntity<>(adminService.getEventList(onGoing, eventTitle, page - 1), HttpStatus.OK);
	}

	// 이벤트 단일 조회_이벤트 수정 모달(1024 JIP)
	@GetMapping("/adminEventDetail")
	public ResponseEntity<?> adminEventDetail(Long eventNo) {

		return new ResponseEntity<>(adminService.getEventDetail(eventNo), HttpStatus.OK);
	}

	// 이벤트 등록(1026 JIP)
	@PostMapping("/adminEvent")
	public ResponseEntity<?> postAdminEvent(String eventTitle,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eventCreateAt, // ISO 8601 형식
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eventEndAt, 
			MultipartFile thumbnail,
			MultipartFile image) {

		// System.out.println("AdminCont.postAdminEvent()");

		AdminEventDTO dto = new AdminEventDTO(null, eventTitle, eventCreateAt, eventEndAt, null, null);
		// System.out.println(dto);

		// service에 DB 입력 요청
		boolean result = adminService.insertEvent(dto, thumbnail, image);

		if (result) {
			return new ResponseEntity<>("event has been created", HttpStatus.CREATED);// code 201
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}

	// 이벤트 수정(1026 JIP)
	@PutMapping("/adminEvent")
	public ResponseEntity<?> putAdminEvent(Long eventNo, String eventTitle,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eventCreateAt, // ISO 8601 형식
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eventEndAt,
			@RequestParam(required = false) MultipartFile thumbnail,
			@RequestParam(required = false) MultipartFile image) {

		// System.out.println("AdminCont.putAdminEvent()");

		AdminEventDTO dto = new AdminEventDTO(eventNo, eventTitle, eventCreateAt, eventEndAt, null, null);
		// System.out.println(dto);
		// System.out.println(thumbnail);
		// System.out.println(image);

		boolean result = adminService.updateEvent(dto, thumbnail, image);

		if (result) {
			return new ResponseEntity<>("event has been modified", HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}

	// 이벤트 삭제(1026 JIP)
	@DeleteMapping("/adminEvent/{eventNo}")
	public ResponseEntity<?> deleteAdminEvent(@PathVariable Long eventNo) {

		boolean result = adminService.deleteEvent(eventNo);

		if (result) {
			return new ResponseEntity<>("event has been deleted", HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}

	// 유저가 작성한 리뷰 조회//(1027 JIP 수정)
	@GetMapping("/adminReviewList")
	public ResponseEntity<?> adminReviewList(boolean underSanction, 
			@RequestParam(defaultValue = "") String userName, // 기본값																		// 설정
			@RequestParam(defaultValue = "1") int page) {// 기본값 설정

		//log.info("AdminController adminReviewList실행");
		System.out.println("비공개 보기 " + underSanction + " 유저이름 " + userName + " 페이지 " + page);

		// 요청한 page 1 -> 넘겨줄 index 0 (예: 첫 페이지)
		// return new ResponseEntity<>("success", HttpStatus.OK);
		return new ResponseEntity<>(adminService.getReviewList(underSanction, userName, page - 1), HttpStatus.OK);
	}

	// 유저가 작성한 리뷰 제재//(1028 JIP 수정)
	@PutMapping("/adminReview/{reviewNo}") 
	// POST->PUT, 날짜를 받아오지 말고 백에서 생성
	// return type: void -> ResponseEntity<?>
	public ResponseEntity<?> putAdminReview(@PathVariable Long reviewNo) {
		//@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate reviewSanctionsAt

		//System.out.println("AdminController putAdminReview실행");
		boolean result = adminService.updateReview(reviewNo);

		if (result) {
			return new ResponseEntity<>("review has been modified", HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();// code 404
		}

	}

	// 유저 조회//(1027 JIP 수정)
	@GetMapping("/adminUserList")
	public ResponseEntity<?> adminUserList(boolean inactive,
			@RequestParam(defaultValue = "") String userName, // 기본값 설정
			@RequestParam(defaultValue = "1") int page) {// 기본값 설정

		//log.info("AdminController adminUserList실행");

		//System.out.println("유저이름 " + userName + " 페이지 " + page);

		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		// if (page == null) {
		// page = 0; // 기본값 설정
		// }

		return new ResponseEntity<>(adminService.adminUserSearch(inactive, userName, page - 1), HttpStatus.OK);
	}

}
