package com.lostay.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MypageEditInfoDTO {

	private Long userNo;       // 회원넘버

	private String userNickname;	// 회원닉네임
	private String userEmail;		// 회원이메일
	private String userPhone;		// 전화번호
	
}
