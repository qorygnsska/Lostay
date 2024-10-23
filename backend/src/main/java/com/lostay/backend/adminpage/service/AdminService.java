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
import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.repository.ReviewRepository;

@Service
@Transactional
public class AdminService {

	@Autowired
	ReviewRepository reviewRepo;
  
	//관리자 유저 리뷰 조회			
	public Object adminReview(String userName,int page) {
		System.out.println("AdminService adminReview실행");
		if(userName!= "") {
			System.out.println("AdminService adminReview실행if문");
			  PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
			    Page<AdminReviewDTO> reviewPage = reviewRepo.adminReviewPageSearch(userName, pageable); // Page<ReviewpageDTO>로 변경
			    
			    List<AdminReviewDTO> adminReviewDTOList = reviewPage.getContent();

			    // 총 요소 수 및 페이지 수 설정
			    for (AdminReviewDTO dto : adminReviewDTOList) {
			    	
			        dto.setPagesize(reviewPage.getTotalPages()); // 총 페이지 수 설정
			    }
			    return adminReviewDTOList; 
			
		}else {
			 PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
			 
			 Page<Object[]> reviewPage = reviewRepo.adminReview(pageable); // Page<ReviewpageDTO>로 변경
			 List<AdminReviewDTO> adminReviewDTO = new ArrayList<AdminReviewDTO>();
			 for(Object[]result:reviewPage) {
				 AdminReviewDTO dto= new AdminReviewDTO();
				 dto.setPagesize(reviewPage.getTotalPages());
				 dto.setReviewNo((Long) result[0]);
				 dto.setRoomName((String)result[1]);
				 dto.setReviewRating((Double) result[2]);
				 dto.setReviewContent((String) result[3]);
				 dto.setUserName((String) result[4]);
				 dto.setReviewCreateAt((LocalDateTime) result[5]);
				 adminReviewDTO.add(dto);
			 }
				return adminReviewDTO;
		}
		
	}

}
