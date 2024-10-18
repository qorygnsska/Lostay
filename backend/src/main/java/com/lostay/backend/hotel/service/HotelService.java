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
        
        String orderByColumn = "overall_average_review_rating"; // 기본 정렬 기준
        // 정렬 기준 설정
        switch (sort) {
            case "리뷰 많은순":
                orderByColumn = "total_review_count";
                break;
            case "낮은 가격순":
                orderByColumn = "price_for_max_discount"; // 가격으로 정렬
                break;
            case "높은 가격순":
                orderByColumn = "room_discount"; // 할인으로 정렬
                break;
        }

        StringBuilder query = new StringBuilder(
            "SELECT " +
            "    h.hotel_no, " +
            "    h.hotel_rating, " +
            "    h.hotel_name, " +
            "    h.hotel_amenities, " +
            "    ROUND(AVG(re.review_rating), 1) AS overall_average_review_rating, " +
            "    COUNT(re.review_no) AS total_review_count, " +
            "    MAX(r.room_discount) AS room_discount, " +
            "    (SELECT MAX(r2.room_price) " +
            "     FROM room r2 " +
            "     WHERE r2.room_discount = MAX(r.room_discount) " +
            "       AND r2.hotel_no = h.hotel_no) AS price_for_max_discount, " +
            "    h.hotel_thumbnail, " +
            "    COUNT(r.room_no) AS room_count " +
            "FROM " +
            "    hotel h " +
            "JOIN " +
            "    room r ON h.hotel_no = r.hotel_no " +
            "LEFT JOIN " +
            "    review re ON r.room_no = re.room_no " +
            "WHERE " +
            "    h.hotel_adress LIKE :hotelAdress " +
            "    AND r.room_price BETWEEN :minRoomPrice AND :maxRoomPrice " +
            "    AND r.room_people_info LIKE :roomPeopleInfo " +
            "    AND h.hotel_rating IN (:hotelRating) " +
            "    AND r.room_no NOT IN ( " +
            "        SELECT p.room_no " +
            "        FROM reservation rs " +
            "        JOIN payment p ON p.pay_no = rs.pay_no " +
            "        WHERE rs.check_in < :checkOut " +
            "          AND rs.check_out > :checkIn " +
            "    ) "
        );

        // 어메니티 조건 추가
        if (hotelAmenities != null && hotelAmenities.length > 0) {
            query.append(" AND ("); // 조건 시작
            for (int i = 0; i < hotelAmenities.length; i++) {
                query.append(" FIND_IN_SET(:amenity" + i + ", h.hotel_amenities) > 0");
                if (i < hotelAmenities.length - 1) {
                    query.append(" AND "); // 마지막이 아닐 때 OR 추가
                }
            }
            query.append(") "); // 조건 끝
        }

        query.append(
            "GROUP BY " +
            "    h.hotel_no, h.hotel_name, h.hotel_rating, h.hotel_thumbnail " +
            "ORDER BY " +
            "    " + orderByColumn + " DESC"
        );

        // 쿼리 출력
        System.out.println("확인용 쿼리: " + query.toString());

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
                typedQuery.setParameter("amenity" + i, hotelAmenities[i]);
            }
        }

        return typedQuery.getResultList();
    }
}
