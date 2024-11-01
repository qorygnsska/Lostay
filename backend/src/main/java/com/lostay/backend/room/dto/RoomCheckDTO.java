package com.lostay.backend.room.dto;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomCheckDTO {
	
	
	private Long Rid;

	private Long count;  // 체크아웃 날짜

	private Long roomNo;			// 객실번호
	
	private LocalDate checkInDay;	// 체크인 날짜

	private LocalDate checkOutDay;  // 체크아웃 날짜
}
