package com.lostay.backend.hotel.service;

import java.util.Arrays;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import org.springframework.stereotype.Service;

@Service
public class HotelService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Object[]> findHotelsFilter(String[] hotelAmenities, String hotelAdress, int minRoomPrice,
            int maxRoomPrice, String checkIn, String checkOut, String roomPeopleInfo, int soldOut,
            String[] hotelRating, String sort) {
        
        String orderByColumn = "overallAverageReviewRating"; // 기본 정렬 기준
        switch (sort) {
            case "리뷰 많은순":
                orderByColumn = "totalReviewCount";
                break;
            case "낮은 가격순":
                orderByColumn = "minRoomPrice";
                break;
            case "높은 가격순":
                orderByColumn = "priceForMaxDiscount";
                break;
        }

        StringBuilder query = new StringBuilder(
            "SELECT " +
            "    h.hotelNo, " +
            "    h.hotelRating, " +
            "    h.hotelName, " +
            "    AVG(re.reviewRating) AS overallAverageReviewRating, " +
            "    COUNT(re.reviewNo) AS totalReviewCount, " +
            "    MAX(r.roomDiscount) AS roomDiscount, " +
            "    (SELECT MAX(r2.roomPrice) " +
            "     FROM Room r2 " +
            "     WHERE r2.hotel.hotelNo = h.hotelNo " +
            "       AND r2.roomDiscount = (SELECT MAX(r3.roomDiscount) FROM Room r3 WHERE r3.hotel.hotelNo = h.hotelNo)) " +
            "    ) AS priceForMaxDiscount, " +
            "    h.hotelThumbnail, " +
            "    COUNT(r.roomNo) AS roomCount " +
            "FROM " +
            "    Hotel h " +
            "JOIN " +
            "    Room r ON h.hotelNo = r.hotel.hotelNo " +
            "LEFT JOIN " +
            "    Review re ON r.roomNo = re.room.roomNo " +
            "WHERE " +
            "    h.hotelAdress LIKE :hotelAdress " +
            "    AND r.roomPrice BETWEEN :minRoomPrice AND :maxRoomPrice " +
            "    AND r.roomPeopleInfo LIKE :roomPeopleInfo " +
            "    AND r.roomNo NOT IN ( " +
            "        SELECT rs.room.roomNo " +
            "        FROM Reservation rs " +
            "        WHERE rs.payment IS NOT NULL " +
            "          AND rs.checkIn < :checkOut " +
            "          AND rs.checkOut > :checkIn " +
            "    ) "
        );

        // 호텔 등급 필터 추가
        if (hotelRating != null && hotelRating.length > 0) {
            query.append(" AND h.hotelRating IN (:hotelRating) ");
        }

        // 어메니티 조건 추가 (AND 조건 사용)
        if (hotelAmenities != null && hotelAmenities.length > 0) {
            query.append(" AND ("); // 어메니티 조건 시작
            for (int i = 0; i < hotelAmenities.length; i++) {
                query.append(" h.hotelAmenities LIKE :amenity" + i);
                if (i < hotelAmenities.length - 1) {
                    query.append(" AND "); // 마지막이 아닐 때만 AND 추가
                }
            }
            query.append(") "); // 조건 끝나면 괄호 닫기
        }

        query.append(
            " GROUP BY " +
            "    h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail " +
            " ORDER BY " +
            "    " + orderByColumn + " DESC"
        );

        TypedQuery<Object[]> typedQuery = entityManager.createQuery(query.toString(), Object[].class);
        typedQuery.setParameter("hotelAdress", "%" + hotelAdress + "%");
        typedQuery.setParameter("minRoomPrice", minRoomPrice);
        typedQuery.setParameter("maxRoomPrice", maxRoomPrice);
        typedQuery.setParameter("roomPeopleInfo", "%" + roomPeopleInfo + "%");
        typedQuery.setParameter("checkIn", checkIn);
        typedQuery.setParameter("checkOut", checkOut);

        // 호텔 등급 파라미터 설정
        if (hotelRating != null && hotelRating.length > 0) {
            typedQuery.setParameter("hotelRating", Arrays.asList(hotelRating));
        }

        // 어메니티 파라미터 설정
        if (hotelAmenities != null && hotelAmenities.length > 0) {
            for (int i = 0; i < hotelAmenities.length; i++) {
                typedQuery.setParameter("amenity" + i, "%" + hotelAmenities[i] + "%");
            }
        }

        return typedQuery.getResultList();
    }
}
