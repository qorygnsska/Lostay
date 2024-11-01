package com.lostay.backend.mypage.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lostay.backend.mypage.service.MypageService;
import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.review.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/mypage")
public class MypageController {
	@Autowired
	private ReviewService revSer;
	
	
	@Autowired
	MypageService mypageService;

	// mypage 조회
	@GetMapping("")//변경전: /mypage 
	public ResponseEntity<?> mypage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		log.info("mypage실행");

		Long userNo = customOAuth2User.getUserNo();

		return new ResponseEntity<>(mypageService.myPageInfo(userNo), HttpStatus.OK);
	}

	// mypage 내가 작성한 리뷰 조회
	@GetMapping("/Review")//변경전: /mypageReview 변경후:/mypage/Review
	public ResponseEntity<?> mypageReview(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam(required = false) Integer page) {

		Long userNo = customOAuth2User.getUserNo();

		log.info("mypageReview실행");
	
		return new ResponseEntity<>(mypageService.mypageReview(userNo, page), HttpStatus.OK);
	}

	// mypage 내가 선택한 찜목록 조회
	@GetMapping("/CartList")//변경전: /mypageCartList 변경후:/mypage/CartList
	public ResponseEntity<?> mypageCartList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestParam(required = false) Integer page) {
		log.info("mypageCartList실행");

		Long userNo = customOAuth2User.getUserNo();

		return new ResponseEntity<>(mypageService.mypageCartList(userNo, page), HttpStatus.OK);

	}

	// mypage 유저 정보 닉네임 수정
	@PutMapping("/UserInfo/nickname/{nickname}")//변경전: /mypageUserInfo/nickname/{nickname} 변경후:/mypage/UserInfo/nickname/{nickname}
	public  ResponseEntity<?> mypageUserInfoNickName(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @PathVariable("nickname") String nickname) {
		Long userNo = customOAuth2User.getUserNo();
		System.out.println("MypageController mypageUserInfoNickName실행");
		boolean result = mypageService.userUpdateNicName(userNo, nickname);

		if (result) {
			return new ResponseEntity<>("성공", HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();// code 404
		}
	}
	
	
	//mypage 유저 정보 전화번호 수정
	@PostMapping("/UserInfo/phone/{phone}")//변경전: /mypageUserInfo/phone/{phone} 변경후:/mypage/UserInfo/phone/{phone}
	public void mypageUserInfoPhone(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @PathVariable("phone") String phone) {
		Long userNo = customOAuth2User.getUserNo();
		System.out.println("MypageController mypageUserInfoPhone실행");
		mypageService.userUpdatePhone(userNo, phone);
	}
	
	//mypage 유저 정보수정화면 출력(값넘어오는거 확인함)
	@GetMapping("/Edit")//변경전: /mypageEdit 변경후:/mypage/Edit
	public ResponseEntity<?> mypageEdit(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		log.info("mypageEdit실행");

		Long userNo = customOAuth2User.getUserNo();

		return new ResponseEntity<>(mypageService.myPageInfoEdit(userNo), HttpStatus.OK);
	}
	
	
	@PostMapping("/User/unsubscribe")//변경전: mypageUser/unsubscribe 변경후:/mypage/User/unsubscribe
	public ResponseEntity<?> mypageUnsubscribe(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Long userNo = customOAuth2User.getUserNo();
		System.out.println("MypageController mypageUnsubscribe");
		mypageService.userUnsubscribe(userNo);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/User/userLogout")//변경전: mypageUser/userLogout 변경후:/mypage/User/userLogout
	public void userLogout(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Long userNo = customOAuth2User.getUserNo();
		System.out.println("MypageController userLogout");
		mypageService.userLogout(userNo);
	}
	
	
	
	

	

	
    // 작성한 내용, 별점, 이미지 디비에 저장
	@PostMapping("/UploadReviewImg")//변경전: /UploadReviewImg 변경후:/mypage/UploadReviewImg
	public void uploadreviewimg(MultipartHttpServletRequest files
							   ,@RequestParam(defaultValue = "3.0") double reviewRating
							   ,@RequestParam(value = "text")String reviewContent
							   ,@RequestParam(defaultValue = "1") Long payNo) {
		
		// 파일을 업로드 하는 위치를 지정
//				String uploadFoler = context.getRealPath("/resources/upload");
			 	String uploadFoler = "C:\\Lostay\\frontend\\public\\reviews";
				// 서비스로 보내줄 배열
				ArrayList<String> fileReadName = new ArrayList<String>();
				
				try {
					// 업로드하는 폴더가 없을 경우
					File uploadDir = new File(uploadFoler);
				
					// 폴더 있으면 안만들고 폴더 없으면
					// 만들 수 있는 예외를 작성
					if (!uploadDir.exists()) {
						uploadDir.mkdirs();
					}
					List<MultipartFile> list = files.getFiles("files");
					
					for(int i=0; i<list.size(); i++) {
						String img = list.get(i).getOriginalFilename();
						
						String n = img.toString().replace("[", "").replace("]", "");
						String extension = n.substring(n.lastIndexOf("."),n.length());
						
						String newFileName = UUID.randomUUID().toString() + extension;
						
						fileReadName.add(newFileName);
						
						long size = list.get(i)
										.getSize();
						System.out.println("파일명:" + newFileName);
						System.out.println("사이즈:" + size);
						
						// 저장할 파일 경로
						File saveFile = new File(uploadFoler + File.separator + newFileName);
						//파일저장
						list.get(i).transferTo(saveFile);
						System.out.println("파일 저장 성공");	
						System.out.println(saveFile);
					}
					
					
				} catch (Exception e) {
					System.out.println("파일 저장 실패");
					e.printStackTrace();
				}

       revSer.saveMyReview(reviewRating,reviewContent,fileReadName, payNo);
	}
	
	
	
	
	
	
}
