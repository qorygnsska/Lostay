package com.lostay.backend.hotel.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.adminpage.dto.HotelInfosDTO;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.review.dto.HotelInfoDTO;
import com.lostay.backend.review.dto.HotelRoomsDTO;
import com.lostay.backend.review.dto.ReviewsDTO;


public interface HotelRepository extends JpaRepository<Hotel, Long>{
	//특가 호텔 top10조회
	@Query("SELECT " +
	           "h.hotelNo, " +
	           "h.hotelRating, " +
	           "h.hotelName, " +
	           "ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
	           "COUNT(re) AS totalReviewCount, " +
	           "MAX(r.roomDiscount) AS roomDiscount, " +
	           "(SELECT MIN(r2.roomPrice) FROM Room r2 WHERE r2.hotel.hotelNo = h.hotelNo AND r2.roomDiscount = MAX(r.roomDiscount)) AS minRoomPrice, " +
	           "h.hotelThumbnail " +
	           "FROM Hotel h " +
	           "JOIN h.rooms r " +
	           "LEFT JOIN r.reviews re " +
	           "GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail " +
	           "ORDER BY roomDiscount DESC, overallAverageReviewRating DESC")
	List<Object[]> findTop10HtolesDiscount(PageRequest pageable);

	
	//hot인기호텔 top10조회
	@Query("SELECT " +
		       "h.hotelNo, " +
		       "h.hotelRating, " +
		       "h.hotelName, " +
		       "ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
		       "COUNT(re) AS totalReviewCount, " + // 리뷰 수를 세는 방법
		       "MAX(r.roomDiscount) AS roomDiscount, " +
	           "(SELECT MIN(r2.roomPrice) FROM Room r2 WHERE r2.hotel.hotelNo = h.hotelNo AND r2.roomDiscount = MAX(r.roomDiscount)) AS minRoomPrice, " +
		       "h.hotelThumbnail " + // 콤마 추가
		       "FROM Hotel h " +
		       "JOIN h.rooms r " + // Room과의 관계를 통해 접근
		       "LEFT JOIN r.reviews re " + // Review와의 관계를 통해 접근
		       "GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail " + // GROUP BY에 hotelThumbnail 추가
		       "ORDER BY overallAverageReviewRating DESC")
	List<Object[]> findTop10HotHotels(PageRequest pageable);

	
	//여행지별 숙소
	@Query("SELECT " +
		       "h.hotelNo, " +
		       "h.hotelRating, " +
		       "h.hotelName, " +
		       "ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
		       "COUNT(re) AS totalReviewCount, " +
		       "MAX(r.roomDiscount) AS roomDiscount, " +
	           "(SELECT MIN(r2.roomPrice) FROM Room r2 WHERE r2.hotel.hotelNo = h.hotelNo AND r2.roomDiscount = MAX(r.roomDiscount)) AS minRoomPrice, " +
		       "h.hotelThumbnail " +
		       "FROM Hotel h " +
		       "JOIN h.rooms r " +
		       "LEFT JOIN r.reviews re " +
		       "WHERE h.hotelAdress LIKE %:hotelAdress% " + 
		       "GROUP BY h.hotelNo, h.hotelRating, h.hotelName, h.hotelThumbnail " +
		       "ORDER BY overallAverageReviewRating DESC")
		List<Object[]> findByHotelAddressContaining(@Param("hotelAdress") String hotelAdress, Pageable pageable);


    //호텔 정보 가져오기 (홍정훈)
		 @Query("SELECT new com.lostay.backend.review.dto.HotelInfoDTO(" +
		           "h.hotelNo, h.hotelName, " +
		           "ROUND(AVG(r.reviewRating), 1), " +
		           "COUNT(r.reviewNo)) " +
		           "FROM Hotel h " +
		           "JOIN h.rooms rm " +
		           "LEFT JOIN rm.reviews r " +
		           "WHERE h.hotelNo = :hotelNo " +
		           "GROUP BY h.hotelNo, h.hotelName")
		HotelInfoDTO hoteInfo(@Param("hotelNo")Long hotelNo);

	//호텔의 객실정보 가져오기(홍정훈)
		 @Query("SELECT new com.lostay.backend.review.dto.HotelRoomsDTO(r.roomNo, r.roomName) " +
			       "FROM Hotel h " +
			       "JOIN h.rooms r " +
			       "WHERE h.hotelNo = :hotelNo")
		List<HotelRoomsDTO> findRoomNames(@Param("hotelNo")Long hotelNo);


		 
		//관리자 페이지 호텔 정보 가져오기(홍정훈)10-28
		 @Query("SELECT new com.lostay.backend.adminpage.dto.HotelInfosDTO(h.hotelNo, h.hotelName, h.hotelRating, h.hotelAdress, h.hotelCommission, SUM(r.roomCount)) " +
			       "FROM Hotel h LEFT JOIN h.rooms r " +
			       "GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelAdress, h.hotelCommission")
		Page<HotelInfosDTO> findBYHotelsInfo(Pageable pageable);


		//(jh)호텔의 리뷰이미지 전부조회
		 @Query("SELECT re.reviewImg FROM Hotel h " +
			       "JOIN h.rooms r " +
			       "JOIN r.reviews re " +
			       "WHERE h.hotelNo = :hotelNo " +
			       "ORDER BY re.reviewNo DESC")
		List<String> findReviewImagesByHotelNo(@Param("hotelNo") Long hotelNo);

		 
		 
	
//	@Query("SELECT " +
//		       "h.hotelNo, " +
//		       "h.hotelRating, " +
//		       "h.hotelName, " +
//		       "ROUND(AVG(re.reviewRating), 1) AS overallAverageReviewRating, " +
//		       "COUNT(re) AS totalReviewCount, " +
//		       "MAX(r.roomDiscount) AS roomDiscount, " +
//		       "MIN(r.roomPrice) AS minRoomPrice, " +
//		       "h.hotelThumbnail " +
//		       "FROM Hotel h " +
//		       "JOIN h.rooms r " +
//		       "LEFT JOIN r.reviews re " +
//		       "WHERE h.hotelAddress LIKE %:hotelAddress% " + // 호텔 주소 필터링
//		       "GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail " +
//		       "ORDER BY overallAverageReviewRating DESC")
//		List<Object[]> findTop6HotelsByAddress(@Param("hotelAddress") String hotelAddress);
//
	
	
		
		
		

}
