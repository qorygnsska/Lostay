package com.lostay.backend.review.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.adminpage.dto.AdminReviewDTO;
import com.lostay.backend.mypage.dto.MypageCartListDTO;
import com.lostay.backend.mypage.dto.ReviewpageDTO;
import com.lostay.backend.review.dto.ReviewsDTO;
import com.lostay.backend.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {


	//Mypage리뷰 내역 조회
	@Query("SELECT r.reviewContent, r.reviewCreateAt, r.reviewImg, r.reviewRating, rm.roomName " +
		       "FROM Review r " +
		       "JOIN r.user u " +
		       "JOIN r.room rm " +
		       "WHERE u.userNo = :userNo " +
		       "ORDER BY r.reviewCreateAt DESC ")
	Page<Object[]> findTop10ReviewPage(@Param("userNo") Long userNo, Pageable pageable);
	
	// 객실리스트 전체 리뷰 조회
	@Query("select rv.reviewContent, rv.reviewImg, rv.reviewCreateAt, rv.reviewRating"
			+ ", r.roomNo, u.userNo, r.roomName, rv.reviewNo from Review rv "
			+ "Join rv.room r  "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo "
			+ "AND rv.reviewSanctionsAt IS NULL ")
	List<Object[]> findHotelReview(@Param("hotelNo")long hotelNo);

	
	// 객실리스트 최근 3개 리뷰 조회
	@Query("select rv.reviewContent, rv.reviewCreateAt, rv.reviewRating "
			+ ", r.roomNo, u.userNo, r.roomName, rv.reviewNo from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo "
			+ "AND rv.reviewSanctionsAt IS NULL "
			+ "ORDER BY rv.reviewCreateAt DESC ")	
	List<Object[]> findHotelReview3(@Param("hotelNo")long hotelNo,Pageable pageable);


	// hotel의 전체 리뷰 별점 평균
	@Query("select AVG(rv.reviewRating) from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where h.hotelNo = :hotelNo")
	Double findHotelReviewAvg(@Param("hotelNo")long hotelNo);

	// hotel의 전체 리뷰 개수
		@Query("select COUNT(rv) from Review rv "
				+ "Join rv.room r "
				+ "Join r.hotel h "
				+ "Join rv.user u "
				+ "Where h.hotelNo = :hotelNo")
		int findHotelReviewCount(@Param("hotelNo")long hotelNo);


		// 객실에 대한 리뷰 조회
		List<Review> findByRoom_RoomNo(long roomNo);
	
	//관리자 페이지 유저 리뷰 조회(작성자 조건검색)
	 @Query("SELECT new com.lostay.backend.adminpage.dto.AdminReviewDTO(r.reviewNo ,u.userName,h.hotelName, rm.roomName, r.reviewRating, r.reviewContent,r.reviewCreateAt,r.reviewSanctionsAt) " +
	           "FROM Review r " +
	           "JOIN r.user u " +
	           "JOIN r.room rm " +
	           "JOIN rm.hotel h " +
	           "WHERE u.userName LIKE CONCAT('%', :userName, '%')")
	Page<AdminReviewDTO> adminReviewPageSearch(@Param("userName") String userName, Pageable pageable);

	 
	 //관리자 페이지 유저 리뷰 조회(작성자 조건검색 + 현재 제재중인 것만 보기)
	 @Query("SELECT new com.lostay.backend.adminpage.dto.AdminReviewDTO(r.reviewNo ,u.userName,h.hotelName, rm.roomName, r.reviewRating, r.reviewContent,r.reviewCreateAt,r.reviewSanctionsAt) " +
	           "FROM Review r " +
	           "JOIN r.user u " +
	           "JOIN r.room rm " +
	           "JOIN rm.hotel h " +
	           "WHERE u.userName LIKE CONCAT('%', :userName, '%')" +
	           "AND r.reviewSanctionsAt IS NOT NULL " )
	 Page<AdminReviewDTO> adminReviewPageSearchUnderSanction(@Param("userName")String userName, Pageable pageable);

	 
	//관리자 페이지 유저 리뷰 조회
	 @Query("SELECT new com.lostay.backend.adminpage.dto.AdminReviewDTO(r.reviewNo ,u.userName,h.hotelName, rm.roomName, r.reviewRating, r.reviewContent,r.reviewCreateAt,r.reviewSanctionsAt) " +
	           "FROM Review r " +
	           "JOIN r.user u " +
	           "JOIN r.room rm " +
	           "JOIN rm.hotel h " 
	         )
	Page<AdminReviewDTO> adminReview(Pageable pageable);


	 // 객실에 대한 리뷰 최근 3개
	 @Query("select rv.reviewContent, rv.reviewCreateAt, rv.reviewRating "
				+ ", r.roomNo, u.userNo, r.roomName, rv.reviewNo, h.hotelNo from Review rv "
				+ "LEFT JOIN rv.room r "
				+ "LEFT JOIN r.hotel h "
				+ "LEFT JOIN rv.user u "
				+ "Where rv.room.roomNo = :roomNo "
				+ "ORDER BY rv.reviewCreateAt DESC ")	
	List<Object[]> findRoomReview3(@Param("roomNo")long roomNo, Pageable pageable);


	// 객실에 대한 룸 리뷰 평균
	@Query("select AVG(rv.reviewRating) from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where rv.room.roomNo = :roomNo "
			+ "AND rv.reviewSanctionsAt IS NULL ")
	double findRoomReviewAvg(@Param("roomNo")long roomNo);


	// 객실에 대한 룸 리뷰 총 개수
	@Query("select COUNT(rv) from Review rv "
			+ "Join rv.room r "
			+ "Join r.hotel h "
			+ "Join rv.user u "
			+ "Where rv.room.roomNo = :roomNo "
			+ "AND rv.reviewSanctionsAt IS NULL ")
	int findRoomReviewCount(@Param("roomNo")long roomNo);

	
	
	
	
	//호텔 객실 리뷰 보기(홍정훈)
	 // 최신 작성순
	    @Query("SELECT rv.reviewNo, rv.reviewRating, rv.reviewCreateAt, " +
	           "u.userNickname, r.roomName, rv.reviewContent, rv.reviewImg " +
	           "FROM Review rv " +
	           "JOIN rv.room r " +
	           "JOIN r.hotel h " +
	           "JOIN rv.user u " +
	           "WHERE h.hotelNo = :hotelNo " +
	           "AND (r.roomNo = :roomNo OR :roomNo IS NULL) " +
	           "AND rv.reviewSanctionsAt IS NULL " +
	    		"ORDER BY rv.reviewCreateAt DESC") // 최신 작성순
	    List<Object[]> findReviewsByDateDesc(@Param("hotelNo") Long hotelNo, @Param("roomNo") Long roomNo);
	 // 평점 높은 순
	    @Query("SELECT rv.reviewNo, rv.reviewRating, rv.reviewCreateAt, " +
	           "u.userNickname, r.roomName, rv.reviewContent, rv.reviewImg " +
	           "FROM Review rv " +
	           "JOIN rv.room r " +
	           "JOIN r.hotel h " +
	           "JOIN rv.user u " +
	           "WHERE h.hotelNo = :hotelNo " +
	           "AND (r.roomNo = :roomNo OR :roomNo IS NULL) " +
	           "AND rv.reviewSanctionsAt IS NULL " +
	    		"ORDER BY rv.reviewRating DESC") // 평점 높은 순
	    List<Object[]> findReviewsByRatingDesc(@Param("hotelNo") Long hotelNo, @Param("roomNo") Long roomNo);
	 // 평점 낮은 순
	    @Query("SELECT rv.reviewNo, rv.reviewRating, rv.reviewCreateAt, " +
	           "u.userNickname, r.roomName, rv.reviewContent, rv.reviewImg " +
	           "FROM Review rv " +
	           "JOIN rv.room r " +
	           "JOIN r.hotel h " +
	           "JOIN rv.user u " +
	           "WHERE h.hotelNo = :hotelNo "  +
	           "AND (r.roomNo = :roomNo OR :roomNo IS NULL) " +
	           "AND rv.reviewSanctionsAt IS NULL " +
	    		"ORDER BY rv.reviewRating ASC") // 평점 낮은 순
	    List<Object[]> findReviewsByRatingAsc(@Param("hotelNo") Long hotelNo, @Param("roomNo") Long roomNo);


}
