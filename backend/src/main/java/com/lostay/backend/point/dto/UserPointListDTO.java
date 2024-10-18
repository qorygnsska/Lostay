package com.lostay.backend.point.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor 
@AllArgsConstructor
public class UserPointListDTO {
	 private String pointDay; // 포인트 날짜
	    private int pointPlusMinus; // 포인트 증감
}
