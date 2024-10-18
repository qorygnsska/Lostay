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
	@Column(name = "event_no")
	private Long eventNo;						// 이벤트넘버
	@Column(name = "event_create_at")
	private LocalDateTime eventCreateAt;		// 시작날짜
	@Column(name = "event_end_at")
	private LocalDateTime eventEndAt;			// 마감날짜
	@Lob
	@Column(name = "event_img")
	private String eventImg;					// 이벤트이미지
	@Column(name = "event_thumbnail")
	private String eventThumbnail;			   // 이벤트 썸네일
	@Column(name = "event_title")
	private String eventTitle;					// 이벤트제목
	
}
