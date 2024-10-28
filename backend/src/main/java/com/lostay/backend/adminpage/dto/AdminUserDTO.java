package com.lostay.backend.adminpage.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserDTO {

	
	private Long userNo;       // 회원넘버
	private String userName;		// 회원이름
	private String userNickname;	// 회원닉네임
	private String userEmail;		// 회원이메일
	private String userPhone;		// 전화번호
	private String userCreateAt;	// 가입일자
	private int userPoint;			// 회원포인트
	private String userStatus;		// 탈퇴여부
	
	
	//(1027 JIP 수정: 개별DTO 필드변수에서 pagesize 제거)
	//private int pagesize; // 총 페이지 수

	//public AdminUserSerarchDTO(Long userNo, String userName, String userNickname, String userEmail, String userPhone,
	//		String userCreateAt, int userPoint, String userStatus) {
	//	super();
	//	this.userNo = userNo;
	//	this.userName = userName;
	//	this.userNickname = userNickname;
	//	this.userEmail = userEmail;
	//	this.userPhone = userPhone;
	//	this.userCreateAt = userCreateAt;
	//	this.userPoint = userPoint;
	//	this.userStatus = userStatus;
	//}
	
	
	
}
