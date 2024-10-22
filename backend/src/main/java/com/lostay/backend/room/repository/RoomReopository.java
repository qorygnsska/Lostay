package com.lostay.backend.room.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lostay.backend.room.entity.Room;

@Repository
public interface RoomReopository extends JpaRepository<Room, Long>{

	
//	@Query("SELECT r FROM Room r JOIN r.hotel h WHERE h.hotelNo = :hotel_no")
//	List<Room> findByHotel_Room(@Param("hotel_no") Long hotelNo);

	
	List<Room> findByHotel_HotelNo(Long hotelNo);

	
	// 객실 리스트에서 각 객실에 대한 정보와 호텔의 정보 가져오기
	@Query("SELECT h.hotelNo, h.hotelName, h.hotelThumbnail, h.hotelImage, h.hotelRating, h.hotelAmenities, " + 
			   "h.hotelAdress, h.hotelTouristAttraction, h.hotelIntroduction, r.roomNo, r.roomCount, " +
			   "r.roomName, r.roomPeopleMax, r.roomPeopleInfo, r.roomThumbnail, r.roomImg, r.roomPrice, r.roomDiscount, " +
			   "r.roomCheckinTime, r.roomCheckoutTime, " +
		       "(r.roomCount - (SELECT COUNT(rs) FROM Reservation rs " +
		       "JOIN rs.payment p " +
		       "WHERE p.roomNo = r.roomNo " +
		       "AND rs.checkIn <= :checkInDate " +
		       "AND rs.checkOut >= :checkOutDate)) AS availableRooms " +
		       "FROM Room r " +
		       "JOIN r.hotel h " +
		       "WHERE r.roomCount <> (SELECT COUNT(rs) FROM Reservation rs " +
		       "JOIN rs.payment p " +
		       "WHERE p.roomNo = r.roomNo " +
		       "AND rs.checkIn <= :checkInDate " +
		       "AND rs.checkOut >= :checkOutDate) " +
		       "AND h.hotelNo = :hotelNo")
	List<Object[]> findHotelRoom(@Param("hotelNo") Long hotelNo
								,@Param("checkInDate") LocalDateTime checkInDate
								,@Param("checkOutDate") LocalDateTime checkOutDate);

	
	



	

}