package com.lostay.backend.event.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long event_no;						// 이벤트넘버
	
	private LocalDateTime event_create_At;		// 시작날짜
	private LocalDateTime event_end_At;			// 마감날짜
	@Lob
	private String event_img;					// 이벤트이미지
	private String event_title;					// 이벤트제목
}
