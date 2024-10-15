package com.lostay.backend.hotel.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lostay.backend.hotel.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long>{
	@Query("SELECT " +
		       "h.hotelNo, " +
		       "h.hotelRating, " +
		       "h.hotelName, " +
		       "ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
		       "COUNT(re) AS totalReviewCount, " + // 리뷰 수를 세는 방법
		       "MAX(r.roomDiscount) AS roomDiscount, " +
		       "MIN(r.roomPrice) AS minRoomPrice, " +
		       "h.hotelThumbnail " + // 콤마 추가
		       "FROM Hotel h " +
		       "JOIN h.rooms r " + // Room과의 관계를 통해 접근
		       "LEFT JOIN r.reviews re " + // Review와의 관계를 통해 접근
		       "GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail " + // GROUP BY에 hotelThumbnail 추가
		       "ORDER BY roomDiscount DESC, overallAverageReviewRating DESC")
	List<Object[]> findTop10Hotels(PageRequest pageable);

}
