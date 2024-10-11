package com.lostay.backend.event.dto;

import java.time.LocalDateTime;

import com.lostay.backend.discount.dto.DiscountDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {

	private Long event_no;						// 이벤트넘버
	
	private LocalDateTime event_create_At;		// 시작날짜
	private LocalDateTime event_end_At;			// 마감날짜
	private String[] event_img;					// 이벤트이미지
	private String event_title;					// 이벤트제목
}
