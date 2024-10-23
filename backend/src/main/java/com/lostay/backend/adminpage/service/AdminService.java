package com.lostay.backend.adminpage.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.adminpage.dto.AdminReviewDTO;
import com.lostay.backend.adminpage.dto.AdminUserSerarchDTO;
import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.user.repository.UserRepository;

@Service
@Transactional
public class AdminService {

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
}
