package com.lostay.backend.room.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.lostay.backend.room.dto.RoomCustomDTO;
import com.lostay.backend.room.dto.RoomListHotelInfoDTO;
import com.lostay.backend.room.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{

	
	List<Room> findByHotel_HotelNo(Long hotelNo);

	
	// 객실 리스트에서 각 객실에 대한 정보와 호텔의 정보 가져오기
//	@Query("SELECT h.hotelNo, h.hotelName, h.hotelThumbnail, h.hotelImage, h.hotelRating, h.hotelAmenities, " + 
//			   "h.hotelAdress, h.hotelTouristAttraction, h.hotelIntroduction, r.roomNo, r.roomCount, " +
//			   "r.roomName, r.roomPeopleMax, r.roomPeopleInfo, r.roomThumbnail, r.roomImg, r.roomPrice, r.roomDiscount, " +
//			   "r.roomCheckinTime, r.roomCheckoutTime, " +
//		       "(r.roomCount - (SELECT COUNT(rs) FROM Reservation rs " +
//		       "JOIN rs.payment p " +
//		       "WHERE p.room.roomNo = r.roomNo " +
//		       "AND rs.checkIn >= :checkInDate " +
//		       "AND rs.checkOut <= :checkOutDate)) AS availableRooms " +
//		       "FROM Room r " +
//		       "JOIN r.hotel h " +
//		       "WHERE r.roomCount <> (SELECT COUNT(rs) FROM Reservation rs " +
//		       "JOIN rs.payment p " +
//		       "WHERE p.room.roomNo = r.roomNo " +
//		       "AND rs.checkIn >= :checkInDate " +
//		       "AND rs.checkOut <= :checkOutDate) " +
//		       "AND h.hotelNo = :hotelNo")
//	List<RoomListDTO> findHotelRoomList(@Param("hotelNo") Long hotelNo
//								,@Param("checkInDate") LocalDateTime in
//								,@Param("checkOutDate") LocalDateTime out);



	
	
	
//	@Query("SELECT new com.lostay.backend.room.dto.HotelInfoDTO " +
//		       "(r.roomCount - (SELECT COUNT(rs) FROM Reservation rs " +
//		       "JOIN rs.payment p " +
//		       "WHERE p.room.roomNo = r.roomNo " +
//		       "AND rs.checkIn >= :checkInDate " +
//		       "AND rs.checkOut <= :checkOutDate)) AS availableRooms " +
//		       "FROM Room r " +
//		       "JOIN r.hotel h " +
//		       "WHERE r.roomCount <> (SELECT COUNT(rs) FROM Reservation rs " +
//		       "JOIN rs.payment p " +
//		       "WHERE p.room.roomNo = r.roomNo " +
//		       "AND rs.checkIn >= :checkInDate " +
//		       "AND rs.checkOut <= :checkOutDate) " +
//		       "AND h.hotelNo = :hotelNo")
//	List<RoomListDTO> findHotelRoomList(@Param("hotelNo") Long hotelNo
//								,@Param("checkInDate") LocalDateTime in
//								,@Param("checkOutDate") LocalDateTime out);


	// 객실 리스트에서 호텔정보
	@Query("SELECT new com.lostay.backend.room.dto.RoomListHotelInfoDTO( "
		  + "h.hotelNo ,h.hotelRating, h.hotelName, COALESCE(AVG(rv.reviewRating), 0.0), "
		  + "COUNT(rv.reviewNo), h.hotelAdress, "
		  + "h.hotelIntroduction, h.hotelAmenities, h.hotelImage "
		  + ") from Hotel h "
		  + "LEFT JOIN h.rooms r "
		  + "LEFT JOIN r.reviews rv "
		  + "WHERE h.hotelNo = :hotelNo "
		     + "GROUP BY h.hotelNo") 
	RoomListHotelInfoDTO findHotelInfo(@Param("hotelNo") Long hotelNo);


	// 객실 디테일에서 이용 가능한 객실에 대한 정보
	@Query("SELECT new com.lostay.backend.room.dto.RoomCustomDTO( "
			  + "r.roomNo, r.roomName, r.roomThumbnail, r.roomPeopleInfo, r.roomPeopleMax "
			  + ",r.roomCheckinTime, r.roomCheckoutTime, r.roomPrice, r.roomDiscount, "
			  + "(r.roomPrice - (r.roomPrice * r.roomDiscount/100)), "
			  + "(r.roomCount - (SELECT COUNT(rs.reservationNo) FROM Reservation rs " 
			  + "JOIN rs.payment p " 
			  + "WHERE p.room.roomNo = r.roomNo " 
			  +	"AND rs.checkIn <= :checkOutDate " 
			  +	"AND rs.checkOut >= :checkInDate))) " 
			  +	"FROM Room r " 
			  +	"JOIN r.hotel h " 
			  +	"WHERE r.roomCount <> (SELECT COUNT(rs.reservationNo) FROM Reservation rs " 
			  +	"JOIN rs.payment p " 
			  +	"WHERE p.room.roomNo = r.roomNo " 
			  +	"AND rs.checkIn <= :checkOutDate " 
			  +	"AND rs.checkOut >= :checkInDate) " 
			  +	"AND h.hotelNo = :hotelNo") 
	List<RoomCustomDTO> findRoomCumstomList(@Param("hotelNo") Long hotelNo
			                               ,@Param("checkInDate") LocalDateTime in
			                               ,@Param("checkOutDate") LocalDateTime out);


	
	@Query("SELECT "
			  + "(r.roomCount - (SELECT COUNT(rs.reservationNo) FROM Reservation rs " 
			  + "JOIN rs.payment p " 
			  + "WHERE p.room.roomNo = r.roomNo " 
			  +	"AND rs.checkIn <= :checkOutDate " 
			  +	"AND rs.checkOut >= :checkInDate)) " 
			  +	"FROM Room r " 
			  + "WHERE roomNo = :roomNo ") 
	Long findAvailableCount(@Param("roomNo")Long roomNo
			               ,@Param("checkInDate")LocalDateTime in
			               ,@Param("checkOutDate")LocalDateTime out);



	

}