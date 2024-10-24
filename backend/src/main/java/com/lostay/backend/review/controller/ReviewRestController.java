package com.lostay.backend.review.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lostay.backend.review.dto.FileDTO;
import com.lostay.backend.review.service.ReviewService;

@RestController
public class ReviewRestController {

	
	@Autowired
	private ReviewService revSer;
	
	
	@Autowired
    private ServletContext context;
	
    // 작성한 내용, 별점, 이미지 디비에 저장
	@PostMapping("/UploadReviewImg")
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
					List<MultipartFile> list = 
							files.getFiles("files");
					
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
	
	
	// 룸리스트에서 리뷰 전체 조회할 때
	@GetMapping("/InquireRoomAll")
	public ResponseEntity<?> inquireroom(@RequestParam(defaultValue = "1") Long hotelNo){
	
		
		return new ResponseEntity<>(revSer.findAllHotelReview(hotelNo),HttpStatus.OK);
	}
	
	
	// 룸리스트에서 리뷰 상위 3개 조회
	@GetMapping("/InquireRoom3")
	public ResponseEntity<?> inquireroom3(@RequestParam(defaultValue = "1") Long hotelNo){
	
		
		return new ResponseEntity<>(revSer.findHotelReview3(hotelNo),HttpStatus.OK);
	}
	
	
	// 객실상세에서 리뷰 전체 조회
	@GetMapping("/InquireRoomDetailAll")
	public ResponseEntity<?> inquireroomdetail(@RequestParam(defaultValue = "1") Long roomNo){
	
		
		return new ResponseEntity<>(revSer.findRoomReviewAll(roomNo),HttpStatus.OK);
	}
	
	
	// 객실별 리뷰 상위 3개 조회
	@GetMapping("/RoomDetail3")
	public ResponseEntity<?> roomdetail3(@RequestParam(defaultValue = "1")Long roomNo){
	
		return new ResponseEntity<>(revSer.findRoomReview3(roomNo),HttpStatus.OK);
	}
	
}
