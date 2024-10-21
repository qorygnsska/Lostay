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
        String orderDirection = "DESC"; // 기본 정렬 방향
        String orderByColumn = "overallAverageReviewRating"; // 기본 정렬 기준
        switch (sort) {
            case "리뷰 많은순":
                orderByColumn = "totalReviewCount";
                break;
            case "낮은 가격순":
                orderByColumn = "priceForMaxDiscount";
                orderDirection = "ASC"; // 가격이 낮은 순으로 정렬
                break;
            case "높은 가격순":
                orderByColumn = "priceForMaxDiscount";
                orderDirection = "DESC"; // 가격이 높은 순으로 정렬
                break;
        }

        StringBuilder query = new StringBuilder(
            "SELECT " +
                "    h.hotelNo, " +
                "    h.hotelRating, " +
                "    h.hotelName, " +
                "    h.hotelAmenities, " +
                "    ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
                "    COUNT(re.reviewNo) AS totalReviewCount, " +
                "    MAX(r.roomDiscount) AS roomDiscount, " +
                "    (SELECT MAX(r2.roomPrice) " +
                "     FROM Room r2 " +
                "     WHERE r2.roomDiscount = MAX(r.roomDiscount) " +
                "       AND r2.hotel.hotelNo = h.hotelNo) AS priceForMaxDiscount, " +
                "    h.hotelThumbnail, " +
                "    COUNT(r.roomNo) AS roomCount " +
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
                "    AND h.hotelRating IN (:hotelRating) " +
                "    AND r.roomNo NOT IN ( " +
                "        SELECT p.room.roomNo " +
                "        FROM Reservation rs " +
                "        JOIN Payment p ON p.payNo = rs.payment.payNo " +
                "        WHERE rs.checkIn < :checkOut " +
                "          AND rs.checkOut > :checkIn " +
                "    ) " +
            "GROUP BY " +
                "    h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail " +
            "HAVING COUNT(r.roomNo) > 0 " // 기본 조건 추가
        );

        // 어메니티 조건 추가
        if (hotelAmenities != null && hotelAmenities.length > 0) {
            query.append(" AND (");
            for (int i = 0; i < hotelAmenities.length; i++) {
                query.append(" FIND_IN_SET(:amenity" + i + ", h.hotelAmenities) > 0");
                if (i < hotelAmenities.length - 1) {
                    query.append(" AND "); // 마지막이 아닐 때 AND 추가
                }
            }
            query.append(") "); // 조건 끝
        }

        // soldOut 조건 추가
        if (soldOut == 0) {
            query.append(" AND COUNT(r.roomNo) > 0 "); // 매진된 숙소 제외
        }

        // roomDiscountState 조건 추가
        if (roomDiscountState == 1) {
            query.append(" AND MAX(r.roomDiscount) > 1 "); // 할인율이 1보다 큰 경우
        } else if (roomDiscountState == 0) {
            query.append(" AND MAX(r.roomDiscount) >= 0 "); // 할인율이 0 이상인 경우
        }

        query.append("ORDER BY " + orderByColumn + " " + orderDirection); // 정렬 방향 추가

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

        List<Object[]> results = typedQuery.getResultList(); // 결과를 가져옵니다.
        List<HotelDTO> hotHotelDTOList = new ArrayList<>(); // DTO 리스트 생성
        double num = 0.01; // 할인율을 위한 변수

        for (Object[] result : results) {
            HotelDTO dto = new HotelDTO();
            
            // 결과값을 DTO에 매핑
            dto.setHotelNo((Long) result[0]); // 호텔 번호
            dto.setHotelRating((String) result[1]); // 호텔 등급
            dto.setHotelName((String) result[2]); // 호텔 이름
            dto.setReviewRating((Double) result[4]); // 평균 리뷰 평점
            dto.setTotalReviewCount((Long) result[5]); // 총 리뷰 수
            dto.setRoomDiscount((int) result[6]); // 최대 할인율
            dto.setRoomPrice((int) result[7]); // 원래 가격

            // 할인된 가격 계산
            int roomPrice = (int) result[7]; // 원래 가격
            int roomDiscount = (int) result[6]; // 할인율
            int discountedPrice = (int) (roomPrice * (1 - (roomDiscount * num))); // 할인된 가격
            dto.setRoomDcPrice(discountedPrice); // 할인된 가격 설정

            dto.setHotelThumbnail((String) result[8]); // 호텔 썸네일

            // DTO를 리스트에 추가
            hotHotelDTOList.add(dto);
        }

        return hotHotelDTOList;
    }

    
}
