package com.lostay.backend.room.repository;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;


import com.lostay.backend.room.entity.Room;

public interface RoomReopository extends JpaRepository<Room, Long>{

	
//	@Query("SELECT r FROM Room r JOIN r.hotel h WHERE h.hotelNo = :hotel_no")
//	List<Room> findByHotel_Room(@Param("hotel_no") Long hotelNo);

	
	List<Room> findByHotel_HotelNo(Long hotelNo);

	
	



	

}