package com.lostay.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private Long user_no;       // 회원넘버
	
	private String user_name;		// 회원이름
	private String user_nickname;	// 회원닉네임
	private String user_email;		// 회원이메일
	private String user_phone;		// 전화번호
	private int user_point;			// 회원포인트
	private String user_role;		// 역할
	private String user_status;		// 탈퇴여부
	private String user_create_At;	// 가입일자
	private String user_token;		// 소셜토큰
}
