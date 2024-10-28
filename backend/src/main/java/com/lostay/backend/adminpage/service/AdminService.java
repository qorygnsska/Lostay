package com.lostay.backend.adminpage.service;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

	String eventDirPath = "C:\\Lostay\\frontend\\public\\event\\";

	@Autowired
	ReviewRepository reviewRepo;

	@Autowired
	UserRepository userRepo;

	// 관리자 페이지 이벤트리스트(1024 JIP)
	public Object getEventList(boolean onGoing, String eventTitle, int pageIndex) {
		// System.out.println("adminServ.getEventList()");

		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("eventNo").descending());
		// 1st: requested Page(from 0)//인덱스는 0부터
		// 2nd: the number of content included in the page//페이지당 10개의 DTO를 담아서 보내주겠다
		// 3rd: event_no 내림차순

		LocalDateTime now = LocalDateTime.now();

		Page<Event> pageOfEventEntity;

		if (onGoing) {
			System.out.println("onGoing +" + eventTitle);
			pageOfEventEntity = eventRepo.findByEventTitleContainingAndEventCreateAtLessThanAndEventEndAtGreaterThan(
					eventTitle, now, now, pageable);
		} else {
			System.out.println("total +" + eventTitle);
			pageOfEventEntity = eventRepo.findByEventTitleContaining(eventTitle, pageable);
		}

		// Page<eventEntity> -> Page<eventDTO>
		Page<AdminEventDTO> pageOfEventDTO = pageOfEventEntity.map(e -> new AdminEventDTO(e.getEventNo(),
				e.getEventTitle(), e.getEventCreateAt(), e.getEventEndAt(), null, null));

		// System.out.println(pageOfEventEntity.getContent());
		// System.out.println(pageOfEventDTO.getContent());
		return pageOfEventDTO;
	}

	// 관리자 페이지 이벤트 상세(수정 모달)(1024 JIP)
	public Object getEventDetail(Long eventNo) {
		// 반환해줄 eventDTO
		AdminEventDTO eventDTO = new AdminEventDTO();
		// DB에서 불러온 eventEntity
		Event eventEntity = eventRepo.findById(eventNo)
				.orElseThrow(() -> new EntityNotFoundException("event not found"));
		// Entity -> DTO
		eventDTO.setEventNo(eventEntity.getEventNo());
		eventDTO.setEventTitle(eventEntity.getEventTitle());
		eventDTO.setEventCreateAt(eventEntity.getEventCreateAt());
		eventDTO.setEventEndAt(eventEntity.getEventEndAt());
		eventDTO.setEventThumbnail(eventEntity.getEventThumbnail());
		eventDTO.setEventImg(eventEntity.getEventImg());

		return eventDTO;
	}

	// 관리자 페이지 이벤트 등록(1026 JIP)
	public boolean insertEvent(AdminEventDTO dto, MultipartFile thumbnail, MultipartFile image) {
		// System.out.println("adminServ.insertEvent()");
		boolean result = false;
		try {
			// 이벤트 번호가 부여되지 않았으니 일단 DB에 저장하여 부여받음
			// thumbnail과 image는 null로 들어감
			Event entity = eventRepo.save(dto.toEntity());

			Long eventNo = entity.getEventNo();// 생성된 entity의 no를 받아와서
			// 디렉토리 경로
			String dirPath = eventDirPath + eventNo.toString();
			// 디렉토리 객체
			File dir = new File(dirPath);
			if (!dir.exists()) {
				dir.mkdirs();// 디렉토리가 존재하지 않으면 만들어
			}

			// 섬네일 객체
			File file_tn = new File(dirPath + "\\" + thumbnail.getOriginalFilename());
			thumbnail.transferTo(file_tn);

			// 이미지 객체
			File file_img = new File(dirPath + "\\" + image.getOriginalFilename());
			image.transferTo(file_img);

			// entity 재설정(Transactional이기 때문에 entity값만 재설정해주면 save가 됨
			entity.setEventThumbnail(file_tn.getAbsolutePath().substring(dirPath.indexOf("event")));
			entity.setEventImg(file_img.getAbsolutePath().substring(dirPath.indexOf("event")));

			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 관리자 페이지 이벤트 수정(1027 JIP)
	public boolean updateEvent(AdminEventDTO dto, MultipartFile thumbnail, MultipartFile image) {
		// System.out.println("adminServ.updateEvent()");
		boolean result = false;
		try {
			Event entity = eventRepo.findById(dto.getEventNo())
					.orElseThrow(() -> new EntityNotFoundException("event not found"));

			// entity 재설정(Transactional이기 때문에 entity값만 재설정해주면 save가 됨
			entity.setEventTitle(dto.getEventTitle());
			entity.setEventCreateAt(dto.getEventCreateAt());
			entity.setEventEndAt(dto.getEventEndAt());

			// 이미 존재하는 이벤트라 디렉토리는 만들어져 있음
			String dirPath = eventDirPath + dto.getEventNo().toString();

			if (thumbnail != null) {// 수정이라 섬네일을 넘겨줄 수도,, 안넘겨줄 수도,,
				// 섬네일 객체
				File file_tn = new File(dirPath + "\\" + thumbnail.getOriginalFilename());
				thumbnail.transferTo(file_tn);
				entity.setEventThumbnail(file_tn.getAbsolutePath().substring(dirPath.indexOf("event")));
			}

			if (image != null) {
				// 이미지 객체
				File file_img = new File(dirPath + "\\" + image.getOriginalFilename());
				image.transferTo(file_img);
				entity.setEventImg(file_img.getAbsolutePath().substring(dirPath.indexOf("event")));
			}

			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 관리자 페이지 이벤트 삭제(1027 JIP)
	public boolean deleteEvent(Long eventNo) {
		// System.out.println("adminServ.deleteEvent: " + eventNo);

		if (eventRepo.existsById(eventNo)) {
			eventRepo.deleteById(eventNo);
			return true;
		} else {
			return false;
		}
	}

	// 관리자 유저 리뷰 조회
	// (1027 JIP 수정: Pageable type 변경)
	// (1027 JIP 수정: return type을 List<> -> Object(Page<>)로 바꾸고 주석처리)
	public Object getReviewList(boolean underSanction, String userName, int pageIndex) {
		System.out.println("AdminService getReviewList 실행");
		// PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청

		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("reviewNo").descending());
		System.out.println("pageable:" + pageable);

		// if (userName != null && !userName.isEmpty()) {
		// Page<AdminReviewDTO> reviewPage = reviewRepo.adminReviewPageSearch(userName,
		// pageable);
		// List<AdminReviewDTO> adminReviewDTOList = reviewPage.getContent();
		//
		// for (AdminReviewDTO dto : adminReviewDTOList) {
		// dto.setPagesize(reviewPage.getTotalPages());
		// }
		// return adminReviewDTOList;
		// } else {
		// Page<AdminReviewDTO> reviewPage = reviewRepo.adminReview(pageable);
		// List<AdminReviewDTO> adminReviewDTOList = reviewPage.getContent();
		//
		// for (AdminReviewDTO dto : adminReviewDTOList) {
		// dto.setPagesize(reviewPage.getTotalPages());
		// }
		// return adminReviewDTOList;
		// }

		if(underSanction) {
			return reviewRepo.adminReviewPageSearchUnderSanction(userName, pageable);
		} else {
			return reviewRepo.adminReviewPageSearch(userName, pageable);
		}
		
	}

	// 관리자 페이지 유저 리뷰 삭제//(1028 JIP 수정)
	// return type: void -> boolean
	public boolean updateReview(Long reviewNo) {
		//log.info("AdminService updateReview 실행");

		boolean result = false;
		try {
			
			Review review = reviewRepo.findById(reviewNo)
					.orElseThrow(() -> new EntityNotFoundException("review not found"));
			
			//제재 일자를 프론트에서 매개변수로 받아오지 않고 
			//백에서 수정하는 당시의 일자 객체를 생성
			LocalDate reviewSanctionsAt = LocalDate.now();
			review.setReviewSanctionsAt(reviewSanctionsAt);
	
			//entity 재설정(Transactional이기 때문에 entity값만 재설정해주면 save가 됨
			//reviewRepo.save(review);
			
			//System.out.println("수정(제재)된 review: " + review);
			result = true;
		} catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 관리자 유저 정보 조회
	// (1027 JIP 수정: Pageable type 변경)
	// (1027 JIP 수정: return type을 List<> -> Object(Page<>)로 바꾸고 주석처리)
	public Object adminUserSearch(boolean inactive, String userName, int pageIndex) {
		System.out.println("AdminService adminUserSearch 실행");

		// PageRequest pageable = PageRequest.of(pageIndex, 10); // 페이지 요청
		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("userNo").descending());
		System.out.println("pageable:" + pageable);

		// if (userName != null && !userName.isEmpty()) {
		// Page<AdminUserSerarchDTO> userPage = userRepo.adminUserPageSearch(userName,
		// pageable);
		// List<AdminUserSerarchDTO> adminUserSerarchDTOList = userPage.getContent();

		// for (AdminUserSerarchDTO dto : adminUserSerarchDTOList) {
		// dto.setPagesize(userPage.getTotalPages());
		// }
		// return adminUserSerarchDTOList;
		// } else {
		// Page<AdminUserSerarchDTO> userPage = userRepo.adminUserPage(pageable);
		// List<AdminUserSerarchDTO> adminUserSerarchDTOList = userPage.getContent();
		// for (AdminUserSerarchDTO dto : adminUserSerarchDTOList) {
		// dto.setPagesize(userPage.getTotalPages());
		// }

		// return adminUserSerarchDTOList;
		// }
		
		if(inactive) {
			return userRepo.adminUserPageSearchInactive(userName, pageable);
		} else {
			return userRepo.adminUserPageSearch(userName, pageable);
			
		}
		
	}

}
