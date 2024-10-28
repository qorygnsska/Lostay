package com.lostay.backend.admin.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="admin_no")
	private Long adminNo;       // 회원넘버
	

	@Column(nullable = false, name="admin_id")
	private String adminId;		// 회원이름
	
	@Column(nullable = false, name="admin_pw")
	private String adminPw;	// 회원닉네임
	
	@Column(nullable = false, name="admin_role")
	private String adminRole;		// 역할
}
