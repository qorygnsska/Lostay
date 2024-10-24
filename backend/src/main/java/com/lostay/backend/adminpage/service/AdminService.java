package com.lostay.backend.adminpage.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.adminpage.dto.AdminEventDTO;
import com.lostay.backend.adminpage.dto.AdminReviewDTO;
import com.lostay.backend.adminpage.dto.AdminUserSerarchDTO;
import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.event.entity.Event;
import com.lostay.backend.event.repository.EventRepository;
import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.entity.Review;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AdminService {

	@Autowired
	EventRepository eventRepo;
	
	@Autowired
	ReviewRepository reviewRepo;

	@Autowired
	UserRepository userRepo;
	
	// 관리자 유저 리뷰 조회
	public List<AdminReviewDTO> adminReview(String userName, int page) {
		System.out.println("AdminService adminReview 실행");
		PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
		System.out.println("pageable:"+pageable);
		if (userName != null && !userName.isEmpty()) {
			Page<AdminReviewDTO> reviewPage = reviewRepo.adminReviewPageSearch(userName, pageable);
			List<AdminReviewDTO> adminReviewDTOList = reviewPage.getContent();

			for (AdminReviewDTO dto : adminReviewDTOList) {
				dto.setPagesize(reviewPage.getTotalPages());
			}
			return adminReviewDTOList;
		} else {
			Page<AdminReviewDTO> reviewPage = reviewRepo.adminReview(pageable);
			List<AdminReviewDTO> adminReviewDTOList = reviewPage.getContent();

			for (AdminReviewDTO dto : adminReviewDTOList) {
				dto.setPagesize(reviewPage.getTotalPages());
			}
			return adminReviewDTOList;
		}
	}

	// 관리자 유저 정보 조회
	public Object adminUserSearch(String userName, int page) {
		System.out.println("AdminService adminUserSearch 실행");
		PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
		System.out.println("pageable:"+pageable);
		if (userName != null && !userName.isEmpty()) {
			Page<AdminUserSerarchDTO> userPage = userRepo.adminUserPageSearch(userName, pageable);
			List<AdminUserSerarchDTO> adminUserSerarchDTOList = userPage.getContent();

			for (AdminUserSerarchDTO dto : adminUserSerarchDTOList) {
				dto.setPagesize(userPage.getTotalPages());
			}
			return adminUserSerarchDTOList;
		} else {
			Page<AdminUserSerarchDTO> userPage = userRepo.adminUserPage(pageable);
			List<AdminUserSerarchDTO> adminUserSerarchDTOList = userPage.getContent();
			for (AdminUserSerarchDTO dto : adminUserSerarchDTOList) {
				dto.setPagesize(userPage.getTotalPages());
			}
			
			return adminUserSerarchDTOList;
			}
	}
	//관리자 페이지 유저 리뷰 삭제 
	public void deleteById(Long reviewNo) {
		log.info("AdminService deleteById 실행");
      Review review = reviewRepo.findById(reviewNo)
          .orElseThrow(() -> new EntityNotFoundException("review not found"));
      log.info("del실행");
      reviewRepo.delete(review); 
		
	}

	//관리자 페이지 이벤트리스트(1024 JIP)
	public Object getEventList(String eventTitle, int page) {
		System.out.println("adminServ.getEventList()");

		for(int i = 0; i < 5; i++) {
			Pageable pageable = PageRequest.of(i, 4);
			//1st: requested Page(from 0)
			//2nd: the number of content included in the page
			
			System.out.println("requestPage: " + i + "of total 5");
			Page<Event> pageOfEvent = eventRepo.findAll(pageable);
			
			System.out.println(pageOfEvent.getContent().toString());
			System.out.println("totalPage: " + pageOfEvent.getTotalPages());
		}
	
		return null;
	}
	
	
	

}
