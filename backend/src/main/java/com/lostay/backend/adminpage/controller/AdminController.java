package com.lostay.backend.adminpage.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lostay.backend.adminpage.dto.AdminEventDTO;
import com.lostay.backend.adminpage.dto.RevenueDataDTO;
import com.lostay.backend.adminpage.dto.AdminHotelUpdateDTO;
import com.lostay.backend.adminpage.dto.AdminRoomUpdateDTO;
import com.lostay.backend.adminpage.service.AdminService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	AdminService adminService;

	// 이벤트 전체 조회(1024 JIP)
	@GetMapping("/eventList") //변경전: /adminEventList 변경후:/admin/eventList
	public ResponseEntity<?> adminEventList(boolean onGoing, 
			@RequestParam(defaultValue = "") String eventTitle,
			@RequestParam(defaultValue = "1") int page) {
		// System.out.println("AdminCont.adminEventList()");
		// System.out.println("searchValue(title): " + eventTitle + " /page: " + page);

		// 요청받은 페이지 인덱스는 0부터: page-1
		return new ResponseEntity<>(adminService.getEventList(onGoing, eventTitle, page - 1), HttpStatus.OK);
	}

	// 이벤트 단일 조회_이벤트 수정 모달(1024 JIP)
	@GetMapping("/eventDetail") //변경전: /adminEventDetail 변경후:/admin/eventDetail
	public ResponseEntity<?> adminEventDetail(Long eventNo) {

		return new ResponseEntity<>(adminService.getEventDetail(eventNo), HttpStatus.OK);
	}

	// 이벤트 등록(1026 JIP)
	@PostMapping("/event")//변경전: /adminEvent 변경후:/admin/event
	public ResponseEntity<?> postAdminEvent(String eventTitle,
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eventCreateAt, // ISO 8601 형식
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eventEndAt, 
			MultipartFile thumbnail,
			MultipartFile image) {

		// System.out.println("AdminCont.postAdminEvent()");

		AdminEventDTO dto = new AdminEventDTO(null, eventTitle, eventCreateAt, eventEndAt, null, null);
		// System.out.println(dto);

		// service에 DB 입력 요청
		boolean result = adminService.createEvent(dto, thumbnail, image);

		if (result) {
			return new ResponseEntity<>("event has been created", HttpStatus.CREATED);// code 201
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}

	// 이벤트 수정(1026 JIP)
	@PutMapping("/event")//변경전: /adminEvent 변경후:/admin/event
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
	@DeleteMapping("/event/{eventNo}")//변경전: /adminEvent/{eventNo} 변경후:admin/event/{eventNo}
	public ResponseEntity<?> deleteAdminEvent(@PathVariable Long eventNo) {

		boolean result = adminService.deleteEvent(eventNo);

		if (result) {
			return new ResponseEntity<>("event has been deleted", HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}

	// 유저가 작성한 리뷰 조회//(1027 JIP 수정)
	@GetMapping("/reviewList")//변경전: /adminReviewList 변경후:/admin/reviewList
	public ResponseEntity<?> adminReviewList(boolean underSanction, 
			@RequestParam(defaultValue = "") String userName, // 기본값																		// 설정
			@RequestParam(defaultValue = "1") int page) {// 기본값 설정

		//log.info("AdminController adminReviewList실행");
		//System.out.println("비공개 보기 " + underSanction + " 유저이름 " + userName + " 페이지 " + page);

		// 요청한 page 1 -> 넘겨줄 index 0 (예: 첫 페이지)
		// return new ResponseEntity<>("success", HttpStatus.OK);
		return new ResponseEntity<>(adminService.getReviewList(underSanction, userName, page - 1), HttpStatus.OK);
	}

	// 유저가 작성한 리뷰 제재//(1028 JIP 수정)
	@PutMapping("/review/{reviewNo}") //변경전: //adminReview/{reviewNo} 변경후:/admin/review/{reviewNo}
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
	@GetMapping("/userList")//변경전: /adminUserList 변경후:/admin/userList
	public ResponseEntity<?> adminUserList(boolean inactive,
			@RequestParam(defaultValue = "") String userName, // 기본값 설정
			@RequestParam(defaultValue = "1") int page) {// 기본값 설정

		//log.info("AdminController adminUserList실행");

		//System.out.println("비활성 보기 " + inactive +"유저이름 " + userName + " 페이지 " + page);

		// page가 null인 경우 기본값을 0으로 설정 (예: 첫 페이지)
		// if (page == null) {
		// page = 0; // 기본값 설정
		// }
		return new ResponseEntity<>(adminService.getUserList(inactive, userName, page - 1), HttpStatus.OK);
	}
	
	

		//홍정훈(관리자 페이지 호텔.객실 텝 정보 조회)
		@GetMapping("/hotelsList")//변경전: /adminhotelsList 변경후:/admin/hotelsList
		public ResponseEntity<?> adminEventList(@RequestParam(defaultValue = "1") int page) {
			
			return new ResponseEntity<>(adminService.getHotels(page-1), HttpStatus.OK);
		}
		
		// 효준(호텔 업데이트)
		@PutMapping("/hotelUpdate")
		public ResponseEntity<?> adminHotelUpdate(@ModelAttribute AdminHotelUpdateDTO adminHotelUpdateDTO,
				@RequestParam(required = false) MultipartFile uploadThumbnail,
				@RequestParam(required = false) List<MultipartFile> uploadImages){
			
			System.out.println(adminHotelUpdateDTO.toString());
			
			return new ResponseEntity<>(adminService.hotelUpdate(adminHotelUpdateDTO,uploadThumbnail,uploadImages),HttpStatus.OK);
		}
		
		// 효준(정해진 호텔에 룸 리스트 가져오기)
		@GetMapping("/roomsList")
		public ResponseEntity<?> adminRoomsList(@RequestParam Long hotelNo,@RequestParam int page){
			
			return new ResponseEntity<>(adminService.roomsList(hotelNo, page-1),HttpStatus.OK);
		}
		
		// 효준(룸 업데이트)
		@PutMapping("/roomUpdate")
		public ResponseEntity<?> adminHotelUpdate(@ModelAttribute AdminRoomUpdateDTO adminRoomUpdateDTO,
				@RequestParam(required = false) MultipartFile uploadThumbnail,
				@RequestParam(required = false) List<MultipartFile> uploadImages){
			
			System.out.println(adminRoomUpdateDTO.toString());
			
			return new ResponseEntity<>(adminService.roomUpdate(adminRoomUpdateDTO,uploadThumbnail,uploadImages),HttpStatus.OK);
		}
		
		

		//홍정훈(관리자 페이지 호텔.객실 텝 객실 할인율 수정)
		@PostMapping("/hotelsListUpdate")//변경전: /adminhotelsListUpdate 변경후:/admin/hotelsListUpdate
		public ResponseEntity<?> adminhotelsListUpdate(Long roomNo,int roomDiscount) {

	
			boolean result = adminService.updateRoomDiscount(roomNo,roomDiscount);

			if (result) {
				return new ResponseEntity<>("room has been modified", HttpStatus.OK); 
			} else {
				return ResponseEntity.notFound().build();// code 404
			}
		}

	
		//관리자 페이지 년도별 매출액 조회(jh)
		@GetMapping("/revenueYearChart")
		public ResponseEntity<?> RevenueChart(){
			System.out.println("RevenueYearChart 실행");
			return new ResponseEntity<>(adminService.RevenueChart(),HttpStatus.OK);
			
		}
		  // 관리자 페이지 월별 매출액 조회
	    @GetMapping("/revenueMonthChart")
	    public ResponseEntity<?> RevenueMonthChart(@RequestParam int year) {
	        return new ResponseEntity<>(adminService.RevenueMonthChart(year), HttpStatus.OK);
	    }

	    
	    // 관리자 페이지 분기별 매출액 조회
	    @GetMapping("/revenuebranchChart")
	    public ResponseEntity<?> RevenuebranchChart(@RequestParam int year) {
	    	System.out.println("RevenuebranchChart 실행");
	        return new ResponseEntity<>(adminService.RevenuebranchChart(year), HttpStatus.OK);
	    }
	    
	    // 관리자 페이지 호텔별 분기 조회
	    @GetMapping("/revenueData")
	    public ResponseEntity<RevenueDataDTO> getRevenueData(@RequestParam String hotelName,@RequestParam int year) {
	        System.out.println("revenueData 실행");
	    	RevenueDataDTO revenueData = adminService.getRevenueDataByHotelName(hotelName,year);
	    	 // revenueData가 비어있는지 확인
	        if (revenueData.getRevenueData() == null || revenueData.getRevenueData().isEmpty()) {
	          return ResponseEntity.notFound().build(); // 404 Not Found
	        }
	        return new ResponseEntity<>(revenueData, HttpStatus.OK); // 200 OK
	    }
	    
	    
}
