package com.lostay.backend.room.entity;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.lostay.backend.room.dto.RoomCheckDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "roomCheck", timeToLive = 900) // 15분 
public class RoomCheck {

	
	@Id
	private Long Rid;

	private Long roomNo;			// 객실번호
	private LocalDate checkInDay;
	private LocalDate checkOutDay;  // 체크아웃 날짜
	    
}
