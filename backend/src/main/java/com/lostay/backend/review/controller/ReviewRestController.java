package com.lostay.backend.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.review.service.ReviewService;

@RestController
public class ReviewRestController {

	
	@Autowired
	private ReviewService revSer;
	
	// 리뷰 작성 페이지
	@GetMapping("/WriteReviewPage")
	public ResponseEntity<?> writereview(@RequestParam() long payNo) {
	
		return new ResponseEntity<>(revSer.findRoomUserInfo(payNo),HttpStatus.OK);
	}
	
	
	// 리뷰 작성하기
	@GetMapping("ReviewInsert")
	public void reviewinsert(@RequestParam() double reviewRating
							,@RequestParam() String reviewContent
							,@RequestParam() String[] reviewImg) {
		
		
		revSer.saveMyReview(reviewRating,reviewContent,reviewImg);
	}
}
