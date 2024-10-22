package com.lostay.backend.mypage.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.cart.repository.CartRepository;
import com.lostay.backend.event.entity.Event;
import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.mypage.dto.MypageDTO;
import com.lostay.backend.mypage.dto.MypageCartListDTO;
import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.entity.Review;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.repository.RoomReopository;
import com.lostay.backend.user.dto.UserDTO;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class MypageService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ReviewRepository reopo;
	
	@Autowired
	private CartRepository cartRepo;
	
	//mypage화면 조회
	public Object myPageInfo(Long userNo) {
		log.info("myPageInfo실행");
		Optional<User> userEntity= userRepo.findById(userNo);
		UserDTO userdto= new UserDTO();
		MypageDTO mypagedto= new MypageDTO();
		mypagedto.setUserNo(userEntity.get().getUserNo());
		mypagedto.setUserNickname(userEntity.get().getUserNickname());
		mypagedto.setUserPoint(userEntity.get().getUserPoint());
		
		return mypagedto;
	}

	//mypage내가 작성한 리뷰 조회
	public Object mypageReview(Long userNo, int page) {
	    log.info("MypageService mypageReview 실행");
	    
	    PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
	    Page<ReviewpageDTO> reviewPage = reopo.findTop10ReviewPage(userNo, pageable); // Page<ReviewpageDTO>로 변경
	    
	    List<ReviewpageDTO> reviewpageDTOList = reviewPage.getContent();

	    // 총 요소 수 및 페이지 수 설정
	    for (ReviewpageDTO dto : reviewpageDTOList) {
	        dto.setReviewCount(reviewPage.getTotalElements()); // 총 요소 수 설정
	        dto.setPagesize(reviewPage.getTotalPages()); // 총 페이지 수 설정
	    }
	    return reviewpageDTOList; 
	}

	//내가 선택한 찜 목록 조회
	public Object mypageCartList(Long userNo, int page) {
	    log.info("MypageService mypageCartList 실행");

	    PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
	    Page<MypageCartListDTO> cartPage = cartRepo.findTop10CartPage(userNo, pageable);

	    List<MypageCartListDTO> cartpageDTOList = cartPage.getContent();

	    // 총 요소 수 및 페이지 수 설정
	    for (MypageCartListDTO dto : cartpageDTOList) {
	        dto.setPagesize(cartPage.getTotalPages()); // 총 페이지 수 설정
	    }
	    return cartpageDTOList;
		    

	}

}
