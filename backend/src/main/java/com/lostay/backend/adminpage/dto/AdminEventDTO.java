package com.lostay.backend.adminpage.dto;

import java.time.LocalDateTime;

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
	private int pageSize;
	
	//pageSize는 DB column에 없어서 전체 생성자로 만들면 binding error가 난다고 함
	public AdminEventDTO(Long eventNo, String eventTitle, LocalDateTime eventCreateAt, LocalDateTime eventEndAt) {
		this.eventNo = eventNo;
		this.eventTitle = eventTitle;
		this.eventCreateAt = eventCreateAt;
		this.eventEndAt = eventEndAt;
	}
	
	
}
