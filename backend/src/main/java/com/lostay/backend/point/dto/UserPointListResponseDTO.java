package com.lostay.backend.point.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserPointListResponseDTO {
	private int userPoint; // 사용자 포인트
    private List<UserPointListDTO> points; // 포인트 목록
}
