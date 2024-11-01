package com.lostay.backend.redis.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.lostay.backend.room.dto.RoomCheckDTO;
import com.lostay.backend.room.entity.RoomCheck;

public interface RoomRedisRepository extends CrudRepository<RoomCheck, Long>{

	 Optional<RoomCheck> findById(Long Rid); 
	 
//	 Optional<RoomCheck> findByRoomNoAndCheckInDayLessThanAndCheckOutDayGreaterThan(Long roomNo, LocalDate checkInDay, LocalDate checkOutDay);
	 
	 List<RoomCheck> findByRoomNoAndCheckInDayLessThanAndCheckOutDayGreaterThan
	 (Long roomNo, LocalDate checkInDay, LocalDate checkOutDay);
}
