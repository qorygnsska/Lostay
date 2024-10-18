package com.lostay.backend.point.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.point.dto.PointDTO;
import com.lostay.backend.point.dto.UserPointListDTO;
import com.lostay.backend.point.dto.UserPointListResponseDTO;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.point.repository.PointRepository;

@Service
public class PointService {

	@Autowired
	private PointRepository pointRepo;
	 @Transactional
	public UserPointListResponseDTO pointList(Long userNo) {
		 List<Point> results = pointRepo.findByUserNoWithPoints(userNo);
		    List<UserPointListDTO> pointDTOList = new ArrayList<>();
		    
		    System.out.println("pointList 실행");
		    
		    int userPoint = 0; // 사용자 포인트 초기화

		    for (Point result : results) {
		        userPoint = result.getUser().getUserPoint(); // 사용자 포인트 저장
		        LocalDateTime pointDay = result.getPointDay();
		        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		        String pointDayStr = pointDay.format(formatter); // ISO 8601 형식으로 포맷

		        UserPointListDTO dto = new UserPointListDTO(pointDayStr, result.getPointPlusMinus());
		        pointDTOList.add(dto);
		    }
		    UserPointListResponseDTO userPoints= new UserPointListResponseDTO(userPoint,pointDTOList);
		    return userPoints ;
		
	
	}

}
