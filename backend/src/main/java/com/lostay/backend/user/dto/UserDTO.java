package com.lostay.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private Long userNo;       // 회원넘버
	
	private String userName;		// 회원이름
	private String userNickname;	// 회원닉네임
	private String userEmail;		// 회원이메일
	private String userPhone;		// 전화번호
	private int userPoint;			// 회원포인트
	private String userRole;		// 역할
	private String userStatus;		// 탈퇴여부
	private String userCreateAt;	// 가입일자
	private String userToken;		// 소셜토큰
}
