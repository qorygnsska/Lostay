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

	private Long eventNo;						// 이벤트넘버
	
	private LocalDateTime eventCreateAt;		// 시작날짜
	private LocalDateTime eventEndAt;			// 마감날짜
	private String[] eventImg;					// 이벤트이미지
	private String eventTitle;					// 이벤트제목
}
