package com.lostay.backend.cart.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.mypage.dto.MypageCartListDTO;

public interface CartRepository extends JpaRepository<Cart, Long> {

	@Query("SELECT new com.lostay.backend.mypage.dto.MypageCartListDTO(" +
	        "u.userNo, c.cartNo, h.hotelNo, h.hotelName, h.hotelThumbnail, " +
	        "h.hotelRating, ROUND(AVG(re.reviewRating), 1), " +
	        "COUNT(re.reviewRating), MAX(r.roomDiscount), " +
	        "MIN(r.roomPrice), " +
	        "(MIN(r.roomPrice) * (1 - (MAX(r.roomDiscount) * 0.01)))" +
	        ") " +
	        "FROM Cart c " + // Cart 엔티티에서 시작
	        "JOIN c.hotels h " + // Cart에서 호텔로의 관계
	        "JOIN h.rooms r " +
	        "LEFT JOIN r.reviews re " +
	        "JOIN c.user u " + // Cart에서 사용자로의 관계
	        "WHERE u.userNo = :userNo " +
	        "GROUP BY h.hotelNo, h.hotelName, h.hotelRating, h.hotelThumbnail, c.cartNo " +
	        "ORDER BY MAX(r.roomDiscount) DESC, ROUND(AVG(re.reviewRating), 1) DESC")
	Page<MypageCartListDTO> findTop10CartPage(@Param("userNo") Long userNo, Pageable pageable);
}
