package com.lostay.backend.point.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Point {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pointNo;				// 포인트넘버
	
	@JoinColumn(name = "userNo", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL)
	private User user;			// 회원넘버(포인트) 외래키
	
	private LocalDateTime pointDay;	// 포인트(적립,사용)날짜
	private int pointPlusMinus;		// 포인트증감
}
