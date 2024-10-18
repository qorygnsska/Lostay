package com.lostay.backend.refresh_token.entity;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Refresh_Token {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="rt_no")
	private Long rtNo;		// 토큰넘버
	
	@JoinColumn(name = "userNo" , nullable = false)
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private User user;	// 회원넘버 외래키
	
	@Column(name="rt_token")
	private int rtToken;	// 리프레쉬토큰
}
