package com.lostay.backend.adminpage.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
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
import com.lostay.backend.adminpage.dto.AdminHotelUpdateDTO;
import com.lostay.backend.adminpage.dto.AdminRevenueChartDTO;
import com.lostay.backend.adminpage.dto.AdminRoomUpdateDTO;
import com.lostay.backend.adminpage.dto.HotelInfosDTO;
import com.lostay.backend.adminpage.dto.RoomsInfosDTO;
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
		Page<HotelInfosDTO> hotelsPage = hotelRepo.findByHotelInfo(pageable);

		
		for (HotelInfosDTO dto : hotelsPage.getContent()) {
			dto.setHotelImageList(
					Arrays.stream(dto.getHotelImage().split(",")).map(String::trim).collect(Collectors.toList()));

			dto.setHotelAmenitiesList(
					Arrays.stream(dto.getHotelAmenities().split(",")).map(String::trim).collect(Collectors.toList()));

			dto.setHotelTouristAttractionList(
					Arrays.stream(dto.getHotelTouristAttraction().split(",")).map(String::trim).collect(Collectors.toList()));
			
		}

		return hotelsPage; // Page<HotelInfosDTO> 반환
	}

	// 효준 호텔 수정
	public boolean hotelUpdate(AdminHotelUpdateDTO adminHotelUpdateDTO, MultipartFile uploadThumbnail,
			List<MultipartFile> uploadImages) {

		Hotel hotel = hotelRepo.getByHotelNo(adminHotelUpdateDTO.getHotelNo());

		hotel.setHotelName(adminHotelUpdateDTO.getHotelName());
		hotel.setHotelCommission(adminHotelUpdateDTO.getHotelCommission());
		hotel.setHotelAdress(adminHotelUpdateDTO.getHotelAdress());
		hotel.setHotelIntroduction(adminHotelUpdateDTO.getHotelIntroduction());
		hotel.setHotelAmenities(String.join(",", adminHotelUpdateDTO.getHotelAmenities()));
		hotel.setHotelRating(adminHotelUpdateDTO.getHotelRating());
		hotel.setHotelTouristAttraction(String.join(",", adminHotelUpdateDTO.getHotelTouristAttractionList()));

		// 경로
		String path = hotel.getHotelThumbnail();
		int lastSlashIndex = path.lastIndexOf("/", path.lastIndexOf("/") - 1);
		String middlePath = path.substring(0, lastSlashIndex + 1);
		
		String initPath = "C:\\Lostay\\frontend\\public\\";
		String thumbnailPath = middlePath +"thumbnail";
		String imagesPath = middlePath + "images";
		
		// 썸네일 파일 지우기
		if(adminHotelUpdateDTO.getHotelDelThumbnail() != null) {
			File file = new File(initPath + adminHotelUpdateDTO.getHotelDelThumbnail());
			System.out.println(initPath + adminHotelUpdateDTO.getHotelDelThumbnail());
	        if (file.exists()) {
	            if (!file.delete()) {
	                return false;
	            }
	        }
		}

        // 썸네일 업로드
        if (uploadThumbnail != null) {
			File uploadDir = new File(initPath + thumbnailPath + "\\" + uploadThumbnail.getOriginalFilename());
			
			System.out.println("썸네일 업로드 경로 : " + initPath + thumbnailPath + "\\" + uploadThumbnail.getOriginalFilename());
			try {
				uploadThumbnail.transferTo(uploadDir);
				hotel.setHotelThumbnail(thumbnailPath + "/" +uploadThumbnail.getOriginalFilename());
			} catch (IllegalStateException | IOException e) {
				return false;
			}
			
		}
        
        
        // 이미지 파일 지우기
        String hotelImageString = hotel.getHotelImage();
        List<String> hotelImageList = new ArrayList<>();
        hotelImageList = new ArrayList<>(Arrays.asList(hotelImageString.split(",")));
        
        for(String imagePath : adminHotelUpdateDTO.getHotelDelImages()) {
        	File file = new File(initPath + imagePath);
            if (file.exists()) {
                if (!file.delete()) {
                    return false;
                }
            }
            hotelImageList.remove(imagePath);
        }
        
        
        // 이미지 업로드
        if(uploadImages != null) {

        	List<String> imageFileNames = new ArrayList<>();
            for (MultipartFile file : uploadImages) {
            	File uploadDir = new File(initPath+imagesPath+ "\\" + file.getOriginalFilename());
            	System.out.println("이미지 업로드 경로 : " + initPath+imagesPath+ "\\" + file.getOriginalFilename());
            	
            	try {
					file.transferTo(uploadDir);
				} catch (IllegalStateException | IOException e) {
					return false;
				}
            	
            	hotelImageList.add(imagesPath+ "/" +file.getOriginalFilename());
            }
        }
        
        hotel.setHotelImage(String.join(",", hotelImageList));
     
		return true;
	}
	
	// 효준 특정 호텔 룸 리스트 가져오기
	public Page<RoomsInfosDTO> roomsList(Long hotelNo, int pageIndex) {
		System.out.println(hotelNo.TYPE);
		System.out.println(hotelNo);
		Pageable pageable = PageRequest.of(pageIndex, 10);
		Page<RoomsInfosDTO> RoomsPage = roomRepo.findByHotelNo(hotelNo,pageable);

		for (RoomsInfosDTO dto : RoomsPage.getContent()) {
			dto.setRoomImageList(
					Arrays.stream(dto.getRoomImg().split(",")).map(String::trim).collect(Collectors.toList()));

			dto.setRoomAmenitiesList(
					Arrays.stream(dto.getRoomAmenities().split(",")).map(String::trim).collect(Collectors.toList()));
			
			dto.setRoomIntroductionList(
					Arrays.stream(dto.getRoomIntroduction().split(",")).map(String::trim).collect(Collectors.toList()));
		}
		
		return RoomsPage;
	}
	
	// 효준 룸 업데이트
	public boolean roomUpdate(AdminRoomUpdateDTO adminRoomUpdateDTO, MultipartFile uploadThumbnail,
			List<MultipartFile> uploadImages) {
	
		Room room = roomRepo.findByRoomNo(adminRoomUpdateDTO.getRoomNo());
		
		room.setRoomName(adminRoomUpdateDTO.getRoomName());
		room.setRoomCount(adminRoomUpdateDTO.getRoomCount());
		room.setRoomPrice(adminRoomUpdateDTO.getRoomPrice());
		room.setRoomDiscount(adminRoomUpdateDTO.getRoomDiscount());
		room.setRoomPeopleMax(adminRoomUpdateDTO.getRoomPeopleMax());
		room.setRoomPeopleInfo(adminRoomUpdateDTO.getRoomPeopleInfo());
		room.setRoomCheckinTime(adminRoomUpdateDTO.getRoomCheckinTime());
		room.setRoomCheckoutTime(adminRoomUpdateDTO.getRoomCheckoutTime());
		room.setRoomAmenities(String.join(",", adminRoomUpdateDTO.getRoomAmenities()));

		// 경로
		String path = room.getRoomThumbnail();
		int lastSlashIndex = path.lastIndexOf("/", path.lastIndexOf("/") - 1);
		String middlePath = path.substring(0, lastSlashIndex + 1);
		
		String initPath = "C:\\Lostay\\frontend\\public\\";
		String thumbnailPath = middlePath +"thumbnail";
		String imagesPath = middlePath + "images";
		
		// 썸네일 파일 지우기
		if(adminRoomUpdateDTO.getRoomThumbnail() != null) {
			File file = new File(initPath + adminRoomUpdateDTO.getRoomThumbnail());
			System.out.println(initPath + adminRoomUpdateDTO.getRoomThumbnail());
	        if (file.exists()) {
	            if (!file.delete()) {
	                return false;
	            }
	        }
		}

        // 썸네일 업로드
        if (uploadThumbnail != null) {
			File uploadDir = new File(initPath + thumbnailPath + "\\" + uploadThumbnail.getOriginalFilename());
			
			System.out.println("썸네일 업로드 경로 : " + initPath + thumbnailPath + "\\" + uploadThumbnail.getOriginalFilename());
			try {
				uploadThumbnail.transferTo(uploadDir);
				room.setRoomThumbnail(thumbnailPath + "/" +uploadThumbnail.getOriginalFilename());
			} catch (IllegalStateException | IOException e) {
				return false;
			}
			
		}
        
        
        // 이미지 파일 지우기
        String roomlImageString = room.getRoomImg();
        List<String> roomImageList = new ArrayList<>();
        roomImageList = new ArrayList<>(Arrays.asList(roomlImageString.split(",")));
        
        for(String imagePath : adminRoomUpdateDTO.getRoomDelImages()) {
        	File file = new File(initPath + imagePath);
            if (file.exists()) {
                if (!file.delete()) {
                    return false;
                }
            }
            roomImageList.remove(imagePath);
        }
        
        
        // 이미지 업로드
        if(uploadImages != null) {

        	List<String> imageFileNames = new ArrayList<>();
            for (MultipartFile file : uploadImages) {
            	File uploadDir = new File(initPath+imagesPath+ "\\" + file.getOriginalFilename());
            	System.out.println("이미지 업로드 경로 : " + initPath+imagesPath+ "\\" + file.getOriginalFilename());
            	
            	try {
					file.transferTo(uploadDir);
				} catch (IllegalStateException | IOException e) {
					return false;
				}
            	
            	roomImageList.add(imagesPath+ "/" +file.getOriginalFilename());
            }
        }
        
        room.setRoomImg(String.join(",", roomImageList));
     
		return true;
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

	// 관리자 페이지 년도별 매출액 조회(jh)
	public List<AdminRevenueChartDTO> RevenueChart() {
		List<Payment> payments = paymentRepo.findAllSuccessfulPayments();

		return payments.stream().collect(Collectors.groupingBy(payment -> payment.getPayDay().getYear())) // 연도별 그룹화
				.entrySet().stream().map(entry -> convertToYearDto(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
	}

	private AdminRevenueChartDTO convertToYearDto(int year, List<Payment> payments) {
		int totalCommission = payments.stream().mapToInt(this::calculateCommission).sum();
		int totalReservations = payments.size(); // 예약 수

		return new AdminRevenueChartDTO(year, totalCommission, totalReservations);
	}

	// 관리자 페이지 월별 매출액 조회(jh)
	public List<AdminRevenueChartDTO> RevenueMonthChart(int year) {
		List<Payment> payments = paymentRepo.findSuccessfulPaymentsByYear(year);

		return payments.stream()
				.collect(Collectors.groupingBy(payment -> String.format("%d-%02d", payment.getPayDay().getYear(),
						payment.getPayDay().getMonthValue()))) // 월별 그룹화
				.entrySet().stream().sorted(Map.Entry.comparingByKey()) // 월 순서로 정렬
				.map(entry -> convertToMonthDto(entry.getKey(), entry.getValue())).collect(Collectors.toList());
	}

	private AdminRevenueChartDTO convertToMonthDto(String month, List<Payment> payments) {
		int totalCommission = payments.stream().mapToInt(this::calculateCommission).sum();
		int totalReservations = payments.size(); // 예약 수

		return new AdminRevenueChartDTO(month, Integer.parseInt(month.substring(0, 4)), totalCommission,
				totalReservations);
	}

	private int calculateCommission(Payment payment) {
		double commissionRate = payment.getRoom().getHotel().getHotelCommission() / 100.0; // 부동소수점으로 변환
		return (int) (payment.getPayPrice() * commissionRate); // 계산 후 정수형으로 변환
	}

	// // 관리자 페이지 분기별 매출액 조회(jh)
	public List<AdminRevenueChartDTO> RevenuebranchChart(int year) {
		List<AdminRevenueChartDTO> result = new ArrayList<>();
		for (int quarter = 1; quarter <= 4; quarter++) {
			List<Payment> payments = paymentRepo.findSuccessfulPaymentsByQuarter(year, quarter);

			int totalCommission = payments.stream().mapToInt(this::calculateCommission).sum();
			int totalReservations = payments.size(); // 예약 수

			result.add(new AdminRevenueChartDTO(year, totalCommission, totalReservations, quarter));
		}
		System.out.println("result:" + result);
		return result;
	}




}
