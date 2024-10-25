package com.lostay.backend.point.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.point.dto.UserPointListDTO;
import com.lostay.backend.point.dto.UserPointListResponseDTO;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.point.repository.PointRepository;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

@Service
@Transactional
public class PointService {

    @Autowired
    private PointRepository pointRepo;

    @Autowired UserRepository userRepo;
    
    public UserPointListResponseDTO pointList(Long userNo, int monthNum) {
        int monthToSubtract = monthNum; // 빼고 싶은 개월 수 (예: 1개월)

        // 현재 날짜에서 monthToSubtract를 빼주기 10월이면 9월
        LocalDate newDate = LocalDate.now().minusMonths(monthToSubtract);

        // 새로운 월과 연도 가져오기
        int year = newDate.getYear();
        int month = newDate.getMonthValue();

        // 시작 날짜 (1일로 설정)
        LocalDateTime startDate = LocalDateTime.of(year, month, 1, 0, 0); // 시작 시간: 00:00

        // 종료 날짜 (해당 월의 마지막 날)
        LocalDate lastDayOfMonth = newDate.withDayOfMonth(newDate.lengthOfMonth());
        LocalDateTime endDate = LocalDateTime.of(lastDayOfMonth.getYear(), lastDayOfMonth.getMonthValue(),
                lastDayOfMonth.getDayOfMonth(), 23, 59, 59); // 종료 시간: 23:59:59

        // 결과 출력
        System.out.println("시작 날짜: " + startDate);
        System.out.println("종료 날짜: " + endDate);

        List<Point> results = pointRepo.findByUserNoWithPoints(userNo, startDate, endDate);
        List<UserPointListDTO> pointDTOList = new ArrayList<>();
        Optional<User> user=userRepo.findById(userNo);
        System.out.println("pointList 실행");

        int userPoint = 0; // 사용자 포인트 초기화
       
        userPoint=user.get().getUserPoint();// 사용자 포인트 저장
        for (Point result : results) {
            LocalDateTime pointDay = result.getPointDay(); 
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String pointDayStr = pointDay.format(formatter); 

            UserPointListDTO dto = new UserPointListDTO(pointDayStr, result.getPointTitle(), result.getPointPlusMinus());
            pointDTOList.add(dto);
        }

        UserPointListResponseDTO userPoints = new UserPointListResponseDTO(userPoint, pointDTOList);
        return userPoints;
    }
}
