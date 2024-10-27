package com.lostay.backend.adminpage.dto;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.lostay.backend.event.entity.Event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminEventDTO {

	private Long eventNo;
	private String eventTitle;
	private LocalDateTime eventCreateAt;
	private LocalDateTime eventEndAt;
	private String eventThumbnail;
	private String eventImg;
	
	
	
	public Event toEntity() {
		
		Event eventEntity = new Event();
		eventEntity.setEventTitle(eventTitle);
		eventEntity.setEventCreateAt(eventCreateAt);
		eventEntity.setEventEndAt(eventEndAt);
		eventEntity.setEventThumbnail(eventThumbnail);
		eventEntity.setEventImg(eventImg);
		
		return eventEntity;
	}

	

}
