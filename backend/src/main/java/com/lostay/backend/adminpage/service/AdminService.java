package com.lostay.backend.adminpage.service;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.lostay.backend.adminpage.dto.AdminRevenueChartDTO;
import com.lostay.backend.adminpage.dto.HotelInfosDTO;
import com.lostay.backend.adminpage.dto.roomsDTO;

import com.lostay.backend.event.entity.Event;
import com.lostay.backend.event.repository.EventRepository;

import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.review.entity.Review;
import com.lostay.backend.review.repository.ReviewRepository;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;
import com.lostay.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AdminService {


	@Autowired
	private HotelRepository hotelRepo;

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private PaymentRepository paymentRepo;

	@Autowired
	EventRepository eventRepo;

	// 이벤트 이미지 파일 저장 경로
	String eventDirPath = "C:\\Lostay\\frontend\\public\\event\\";

	
	@Autowired
	private ReviewRepository reviewRepo;

	@Autowired
	private UserRepository userRepo;

	// 관리자 페이지 이벤트리스트(1024 JIP)
	public Object getEventList(boolean onGoing, String eventTitle, int pageIndex) {
		// System.out.println("adminServ.getEventList()");

		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("eventNo").descending());
		// 1st: requested Page(from 0)//인덱스는 0부터
		// 2nd: the number of content included in the page//페이지당 10개의 DTO를 담아서 보내주겠다
		// 3rd: event_no 내림차순

		LocalDateTime now = LocalDateTime.now();

		Page<Event> pageOfEventEntity;

		if (onGoing) {// 현재 진행 중인 이벤트만: 시작날짜 < 오늘 < 종료날짜
			// System.out.println("onGoing +" + eventTitle);
			pageOfEventEntity = eventRepo.findByEventTitleContainingAndEventCreateAtLessThanAndEventEndAtGreaterThan(
					eventTitle, now, now, pageable);
		} else {
			// System.out.println("total +" + eventTitle);
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
	public boolean createEvent(AdminEventDTO dto, MultipartFile thumbnail, MultipartFile image) {
		// System.out.println("adminServ.createEvent()");
		boolean result = false;
		try {
			// 이벤트 번호가 부여되지 않았으니 일단 DB에 저장(create)하여 eventNo 부여받음
			// thumbnail과 image는 null로 들어감
			Event entity = eventRepo.save(dto.toEntity());

			Long eventNo = entity.getEventNo();// 생성된 entity의 eventNo를 받아와서
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

			// entity 재설정(Transactional이기 때문에 entity값만 재설정해주면 자동으로 바인딩하여 save(update)가 됨
			// entity를 save하니 entity가 2개 만들어짐!!
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
		// System.out.println("AdminService getReviewList 실행");
		// PageRequest pageable = PageRequest.of(page, 10); // 페이지 요청

		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("reviewNo").descending());
		// System.out.println("pageable:" + pageable);

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

		if (underSanction) {// '제재'된 리뷰만
			return reviewRepo.adminReviewPageSearchUnderSanction(userName, pageable);
		} else {
			return reviewRepo.adminReviewPageSearch(userName, pageable);
		}

	}

	// 관리자 페이지 유저 리뷰 삭제//(1028 JIP 수정)
	// return type: void -> boolean
	public boolean updateReview(Long reviewNo) {
		// log.info("AdminService updateReview 실행");

		boolean result = false;
		try {

			Review review = reviewRepo.findById(reviewNo)
					.orElseThrow(() -> new EntityNotFoundException("review not found"));

			// 제재 일자를 프론트에서 매개변수로 받아오지 않고
			// 백에서 수정하는 당시의 일자 객체를 생성
			LocalDate reviewSanctionsAt = LocalDate.now();
			review.setReviewSanctionsAt(reviewSanctionsAt);

			// entity 재설정(Transactional이기 때문에 entity값만 재설정해주면 save가 됨
			// reviewRepo.save(review);

			// System.out.println("수정(제재)된 review: " + review);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 관리자 유저 정보 조회
	// (1027 JIP 수정: Pageable type 변경)
	// (1027 JIP 수정: return type을 List<> -> Object(Page<>)로 바꾸고 주석처리)
	public Object getUserList(boolean inactive, String userName, int pageIndex) {
		// System.out.println("AdminService getUserList 실행");

		// PageRequest pageable = PageRequest.of(pageIndex, 10); // 페이지 요청
		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("userNo").descending());
		// System.out.println("pageable:" + pageable);

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

		if (inactive) {// '비활성'인 회원만
			return userRepo.adminUserPageSearchInactive(userName, pageable);
		} else {
			return userRepo.adminUserPageSearch(userName, pageable);

		}

	}

	// 홍정훈(관리자 페이지 호텔.객실 텝 정보 조회)
	public Page<HotelInfosDTO> getHotels(int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("hotelNo").ascending());
		Page<HotelInfosDTO> hotelsDTOPage = hotelRepo.findBYHotelsInfo(pageable);
		// 모든 호텔을 가져옴
		List<Hotel> allHotels = hotelRepo.findAll();
		// 각 호텔 DTO에 방 리스트 설정
		for (HotelInfosDTO dto : hotelsDTOPage.getContent()) {
			List<roomsDTO> roomsList = new ArrayList<>(); // 호텔마다 새로운 리스트 생성
			// 모든 호텔에서 해당 호텔의 방 정보를 가져옴
			for (Hotel hotel : allHotels) {
				if (hotel.getHotelNo().equals(dto.getHotelNo())) {
					for (Room room : hotel.getRooms()) {
						roomsDTO roomsdto = new roomsDTO();
						roomsdto.setRoomNo(room.getRoomNo());
						roomsdto.setRoomName(room.getRoomName());
						roomsdto.setRoomCount(room.getRoomCount());
						roomsdto.setRoomPrice(room.getRoomPrice());
						roomsdto.setRoomDiscount(room.getRoomDiscount());
						roomsList.add(roomsdto); // 방 정보를 리스트에 추가
					}
				}
			}

			dto.setRooms(roomsList); // 각 호텔 DTO에 방 리스트 설정
		}

		return hotelsDTOPage; // Page<HotelInfosDTO> 반환
	}

	// 홍정훈(관리자 페이지 호텔.객실 텝 객실 할인율 수정)
	public boolean updateRoomDiscount(Long roomNo, int roomDiscount) {
		Optional<Room> optionalRoom = roomRepo.findById(roomNo); // 방을 가져옴

		if (optionalRoom.isPresent()) { // 방이 존재하면
			Room room = optionalRoom.get(); // 방 객체 가져오기
			room.setRoomDiscount(roomDiscount); // 할인율 업데이트
			return true;
		} else {
			return false;
		}
	}
	
	 //관리자 페이지 년도별 매출액 조회(jh)
    public List<AdminRevenueChartDTO> RevenueChart() {
        List<Payment> payments = paymentRepo.findAllSuccessfulPayments();

        return payments.stream()
                .collect(Collectors.groupingBy(payment -> payment.getPayDay().getYear())) // 연도별 그룹화
                .entrySet().stream()
                .map(entry -> convertToYearDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private AdminRevenueChartDTO convertToYearDto(int year, List<Payment> payments) {
        int totalCommission = payments.stream()
                .mapToInt(this::calculateCommission)
                .sum();
        int totalReservations = payments.size(); // 예약 수

        return new AdminRevenueChartDTO(null, year, totalCommission, totalReservations);
    }

    //관리자 페이지 월별 매출액 조회(jh)
    public List<AdminRevenueChartDTO> RevenueMonthChart(int year) {
        List<Payment> payments = paymentRepo.findSuccessfulPaymentsByYear(year);

        return payments.stream()
                .collect(Collectors.groupingBy(payment -> 
                    String.format("%d-%02d", payment.getPayDay().getYear(), payment.getPayDay().getMonthValue()))) // 월별 그룹화
                .entrySet().stream()
                .sorted(Map.Entry.comparingByKey()) // 월 순서로 정렬
                .map(entry -> convertToMonthDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private AdminRevenueChartDTO convertToMonthDto(String month, List<Payment> payments) {
        int totalCommission = payments.stream()
                .mapToInt(this::calculateCommission)
                .sum();
        int totalReservations = payments.size(); // 예약 수

        return new AdminRevenueChartDTO(month, Integer.parseInt(month.substring(0, 4)), totalCommission, totalReservations);
    }

    private int calculateCommission(Payment payment) {
        double commissionRate = payment.getRoom().getHotel().getHotelCommission() / 100.0; // 부동소수점으로 변환
        return (int) (payment.getPayPrice() * commissionRate); // 계산 후 정수형으로 변환
    }

}
