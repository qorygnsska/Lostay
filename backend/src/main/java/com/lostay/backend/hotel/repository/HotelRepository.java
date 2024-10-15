package com.lostay.backend.hotel.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lostay.backend.hotel.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

	@Query("SELECT " + "h.hotelNo, " + "h.hotelRating, " + "h.hotelName, "
			+ "ROUND(AVG(r.averageReviewRating), 1) AS overallAverageReviewRating, "
			+ "SUM(r.reviewCount) AS totalReviewCount, " + "MAX(r.roomDiscount) AS roomDiscount, "
			+ "MIN(r.roomPrice) AS minRoomPrice " + "FROM " + "(SELECT " + "h2.hotelNo, " + "h2.hotelName, "
			+ "h2.hotelRating, " + "r2.roomNo, " + "r2.roomName, " + "r2.roomDiscount, " + "r2.roomPrice, "
			+ "AVG(re.reviewRating) AS averageReviewRating, " + "COUNT(re.reviewNo) AS reviewCount " + "FROM Hotel h2 "
			+ "JOIN Room r2 ON h2.hotelNo = r2.hotelNo " + "LEFT JOIN Review re ON r2.roomNo = re.roomNo "
			+ "GROUP BY h2.hotelNo, h2.hotelName, r2.roomNo, r2.roomName, r2.roomDiscount, r2.roomPrice) r "
			+ "GROUP BY h.hotelNo, h.hotelName, h.hotelRating "
			+ "ORDER BY MAX(r.roomDiscount) DESC, overallAverageReviewRating DESC")
	List<Object[]> findTop10Hotels(PageRequest pageable);

}
