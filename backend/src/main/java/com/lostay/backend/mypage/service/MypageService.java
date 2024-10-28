package com.lostay.backend.mypage.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.lostay.backend.mypage.dto.MypageEditInfoDTO;
import com.lostay.backend.mypage.dto.MypageCartListDTO;
import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.entity.Review;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.repository.RoomRepository;
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
	   
	    Page<Object[]> reviewPage = reopo.findTop10ReviewPage(userNo, pageable); // Page<ReviewpageDTO>로 변경
	    
	    
	  
	    List<ReviewpageDTO> reviewpageDTOList = new ArrayList<>();
	    
	    // Object[]를 반복하여 ReviewpageDTO로 변환
	    for (Object[] row : reviewPage.getContent()) {
	    	ReviewpageDTO dto = new ReviewpageDTO();
	    	dto.setReviewContent((String) row[0]);
	    	dto.setReviewCreateAt((LocalDateTime) row[1]);
	        if (row[2] != null) {
	            String[] str = row[2].toString().split(",");
	            dto.setReviewImg(str);
	        } else {
	            dto.setReviewImg(null); // 빈 배열로 초기화
	        }
	    	dto.setReviewRating((double) row[3]);
	        dto.setRoomName((String) row[4]);
	       
	        reviewpageDTOList.add(dto);
	    }

	    
	    Map<String, Object> reviewList = new HashMap<>();
	    reviewList.put("reviewList", reviewpageDTOList);
	    reviewList.put("totalReview", reviewPage.getTotalElements());
	    reviewList.put("totalPage", reviewPage.getTotalPages()-1);
	    reviewList.put("page", page);
	    
	    return reviewList; 
	}

	//내가 선택한 찜 목록 조회
	public Object mypageCartList(Long userNo, int page) {
	    log.info("MypageService mypageCartList 실행");
	    System.out.println("p[age" + page);
	    PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청
	    Page<MypageCartListDTO> cartPage = cartRepo.findTop10CartPage(userNo, pageable);

	    List<MypageCartListDTO> cartpageDTOList = cartPage.getContent();
	    
	    Map<String, Object> cartList = new HashMap<>();
	    cartList.put("wishList", cartpageDTOList);
	    cartList.put("totalPage", cartPage.getTotalPages()-1);
	    cartList.put("page", page);
	    
		
	    return cartList;
		    

	}
	//mypage 유정 정보수정(nickname)
	public boolean  userUpdateNicName(Long userNo, String nickname) {
		 log.info("MypageService userUpdateNicName 실행");
		 Optional<User> userEntityOptional = userRepo.findById(userNo);	  
		 
		  User userEntity = userEntityOptional.orElseThrow(() -> new RuntimeException("User not found"));
		  
		    // 닉네임 중복 검사
		    if (userRepo.existsByUserNickname(nickname)) {
		        return false; // 닉네임이 이미 존재하는 경우 false 반환
		    }
		  
		    // 닉네임 업데이트
		    userEntity.setUserNickname(nickname);

		    // 업데이트된 엔티티 저장
		   // userRepo.save(userEntity);
		    return true; // 업데이트 성공 시 true 반환
	}
	//mypage 유저 정보수정(phone)
	public void userUpdatePhone(Long userNo, String phone) {
		 log.info("MypageService userUpdatePhone 실행");
		 Optional<User> userEntityOptional = userRepo.findById(userNo);	      
		  User userEntity = userEntityOptional.orElseThrow(() -> new RuntimeException("User not found"));

		    // 닉네임 업데이트
		    userEntity.setUserPhone(phone);

		    // 업데이트된 엔티티 저장
		    userRepo.save(userEntity);
		 
	}
	//mypage 유저 정보수정화면 출력
	public Object myPageInfoEdit(Long userNo) {
		Optional<User> userEntity= userRepo.findById(userNo);
		MypageEditInfoDTO userdto= new MypageEditInfoDTO();
		userdto.setUserNo(userEntity.get().getUserNo());
		userdto.setUserNickname(userEntity.get().getUserNickname());
		userdto.setUserEmail(userEntity.get().getUserEmail());
		userdto.setUserPhone(userEntity.get().getUserPhone());
		
		return userdto;
		
	}
	
	



}
