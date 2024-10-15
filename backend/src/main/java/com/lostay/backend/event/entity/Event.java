package com.lostay.backend.event.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long eventNo;						// 이벤트넘버
	
	private LocalDateTime eventCreateAt;		// 시작날짜
	private LocalDateTime eventEndAt;			// 마감날짜
	@Lob
	private String eventImg;					// 이벤트이미지
	private String eventThumbnail;			   // 이벤트 썸네일
	private String eventTitle;					// 이벤트제목
}
