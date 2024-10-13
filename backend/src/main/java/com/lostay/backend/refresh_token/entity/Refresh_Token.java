package com.lostay.backend.refresh_token.entity;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Refresh_Token {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long rt_no;		// 토큰넘버
	
	@JoinColumn(name = "user_no" , nullable = false)
	@OneToOne(cascade = CascadeType.ALL)
	private User user;	// 회원넘버 외래키
	
	private int rt_token;	// 리프레쉬토큰
}
