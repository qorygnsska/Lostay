package com.lostay.backend.hotel.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.hotel.dto.HotelDTO;

@Service
@Transactional
public class HotelService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<HotelDTO> findHotelsFilter(String[] hotelAmenities, String hotelsearch, int minRoomPrice,
            int maxRoomPrice, String checkIn, String checkOut, int roomPeopleInfo, int soldOut,
            int roomDiscountState, String[] hotelRating, String sort) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate checkInDate = LocalDate.parse(checkIn, formatter);
        LocalDate checkOutDate = LocalDate.parse(checkOut, formatter);
        LocalDateTime checkInDateTime = checkInDate.atStartOfDay();
        LocalDateTime checkOutDateTime = checkOutDate.atStartOfDay();

        String orderByColumn = "";
        String orderDirection = "DESC"; // 기본 정렬 방향
        if (sort == null) {
            orderByColumn = "overallAverageReviewRating"; // 기본 정렬 기준
        } else {
            switch (sort) {
                case "평점 높은 순":
                    orderByColumn = "overallAverageReviewRating";
                    break;
                case "리뷰 많은 순":
                    orderByColumn = "totalReviewCount";
                    break;
                case "낮은 가격 순":
                    orderByColumn = "discountedPrice"; // 할인된 가격 기준
                    orderDirection = "ASC"; // 가격이 낮은 순으로 정렬
                    break;
                case "높은 가격 순":
                    orderByColumn = "discountedPrice"; // 할인된 가격 기준
                    orderDirection = "DESC"; // 가격이 높은 순으로 정렬
                    break;
            }
        }

        StringBuilder query = new StringBuilder(
            "SELECT " +
                "    h.hotelNo, " +
                "    h.hotelName, " +
                "    h.hotelRating, " +
                "    ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
                "    COUNT(re.reviewNo) AS totalReviewCount, " +
                "    MAX(r.roomDiscount) AS roomDiscount, " +
                "    MAX(r.roomPrice) AS roomPrice, " +
                "    MAX(r.roomPrice * (1 - (r.roomDiscount * 0.01))) AS discountedPrice, " +
                "    h.hotelThumbnail " +
            "FROM " +
                "    Hotel h " +
                "JOIN " +
                "    Room r ON h.hotelNo = r.hotel.hotelNo " +
                "LEFT JOIN " +
                "    Review re ON r.roomNo = re.room.roomNo " +
            "WHERE " +
                "    (h.hotelAdress LIKE :hotelsearch " +
                "    OR h.hotelName LIKE :hotelsearch " +
                "    OR h.hotelIntroduction LIKE :hotelsearch) " +
                "    AND r.roomPrice BETWEEN :minRoomPrice AND :maxRoomPrice " +
                "    AND r.roomPeopleMax >= :roomPeopleInfo " +
                "    AND r.roomNo NOT IN ( " +
                "        SELECT p.room.roomNo " +
                "        FROM Reservation rs " +
                "        JOIN Payment p ON p.payNo = rs.payment.payNo " +
                "        WHERE rs.checkIn < :checkOut " +
                "          AND rs.checkOut > :checkIn " +
                "    ) "
        );
        
        // 어메니티 조건 추가
        if (hotelAmenities.length > 0) {
        	
            query.append(" AND (");
            for (int i = 0; i < hotelAmenities.length; i++) {
                query.append(" FIND_IN_SET(:amenity" + i + ", h.hotelAmenities) > 0");
                if (i < hotelAmenities.length - 1) {
                    query.append(" AND "); // 마지막이 아닐 때 AND 추가
                }
            }
            query.append(") "); // 조건 끝
        }

        // GROUP BY 절 추가
        query.append(" GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail ");

        // HAVING 절을 위한 StringBuilder 생성
        StringBuilder havingClause = new StringBuilder("HAVING 1=1 "); // 기본 조건 추가

        // soldOut 조건 추가
        if (soldOut == 1) {
            havingClause.append("AND COUNT(r.roomNo) > 0 "); // 매진되지 않은 호텔만 포함
        } else if (soldOut == 0) {
            havingClause.append("AND COUNT(r.roomNo) >= 0 "); // 전부 포함
        }

        // roomDiscountState 조건 추가
        if (roomDiscountState == 1) {
            havingClause.append("AND MAX(r.roomDiscount) > 0 "); // 할인율이 1보다 큰 경우
        } else if (roomDiscountState == 0) {
            havingClause.append("AND MAX(r.roomDiscount) >= 0 "); // 할인율이 0 이상인 경우
        }

        // hotelRating 조건 추가
        if (hotelRating != null && hotelRating.length > 0) {
            havingClause.append("AND h.hotelRating IN (:hotelRating) "); // 호텔 등급 조건
        }

        // HAVING 절이 존재하면 쿼리에 추가
        query.append(havingClause.toString());

        // 할인된 가격 범위 추가
        query.append(" AND MAX(r.roomPrice * (1 - (r.roomDiscount * 0.01))) BETWEEN :minDiscountedPrice AND :maxDiscountedPrice ");

        query.append(" ORDER BY " + orderByColumn + " " + orderDirection); // 정렬 방향 추가

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query.toString(), Object[].class);
        typedQuery.setParameter("hotelsearch", "%" + hotelsearch + "%");
        typedQuery.setParameter("minRoomPrice", minRoomPrice);
        typedQuery.setParameter("maxRoomPrice", maxRoomPrice);
        typedQuery.setParameter("roomPeopleInfo", roomPeopleInfo);
        typedQuery.setParameter("checkIn", checkInDateTime);
        typedQuery.setParameter("checkOut", checkOutDateTime);

        // 호텔 등급 파라미터 설정
        if (hotelRating != null && hotelRating.length > 0) {
            typedQuery.setParameter("hotelRating", Arrays.asList(hotelRating));
        }

        // 어메니티 파라미터 설정
        if (hotelAmenities != null && hotelAmenities.length > 0) {
            for (int i = 0; i < hotelAmenities.length; i++) {
                typedQuery.setParameter("amenity" + i, hotelAmenities[i]);
            }
        }

        // 할인된 가격 범위 설정
        double minDiscountedPrice = minRoomPrice; // 예시 값
        double maxDiscountedPrice = maxRoomPrice; // 예시 값

        typedQuery.setParameter("minDiscountedPrice", minDiscountedPrice);
        typedQuery.setParameter("maxDiscountedPrice", maxDiscountedPrice);

        List<Object[]> results = typedQuery.getResultList(); // 결과를 가져옵니다.
        List<HotelDTO> hotHotelDTOList = new ArrayList<>(); // DTO 리스트 생성

        for (Object[] result : results) {
            HotelDTO dto = new HotelDTO();
            
            // 결과값을 DTO에 매핑
            dto.setHotelNo((Long) result[0]); // 호텔 번호
            dto.setHotelName((String) result[1]); // 호텔 이름
            dto.setHotelRating((String) result[2]); // 호텔 등급
            dto.setReviewRating((Double) result[3]); // 평균 리뷰 평점
            dto.setTotalReviewCount((Long) result[4]); // 총 리뷰 수

            // 최대 할인율을 int로 변환
            int roomDiscount = ((Number) result[5]).intValue(); // 최대 할인율
            dto.setRoomDiscount(roomDiscount); 

            // 원래 가격을 int로 변환
            int roomPrice = ((Number) result[6]).intValue(); // 원래 가격
            dto.setRoomPrice(roomPrice); 

            // 할인된 가격을 그대로 사용
            int discountedPrice = ((Number) result[7]).intValue(); // 할인된 가격
            dto.setRoomDcPrice(discountedPrice); // 할인된 가격 설정
            dto.setHotelThumbnail((String) result[8]); // 호텔 썸네일
            
            // DTO를 리스트에 추가
            hotHotelDTOList.add(dto);
        }

        return hotHotelDTOList;
    }
}
