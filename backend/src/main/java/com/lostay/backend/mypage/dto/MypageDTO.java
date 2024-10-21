package com.lostay.backend.mypage.dto;

import java.util.List;

import com.lostay.backend.point.dto.UserPointListDTO;
import com.lostay.backend.point.dto.UserPointListResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MypageDTO {
	private Long userNo;       // 회원넘버
	private String userNickname;	// 회원닉네임
	private int userPoint; // 사용자 포인트
}
