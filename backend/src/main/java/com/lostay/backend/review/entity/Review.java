package com.lostay.backend.review.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.lostay.backend.room.entity.Room;
import com.lostay.backend.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewNo;						// 리뷰넘버
	
	@JoinColumn(name = "roomNo", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Room room;						// 객실넘버 외래키
	
	@JoinColumn(name = "userNo", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private User user;						// 회원넘버 외래키
	
	private double reviewRating;					// 리뷰별점
	private String reviewContent;				// 리뷰내용
	@Lob
	private String reviewImg;					// 리뷰이미지
	private LocalDateTime reviewCreateAt;		// 작성날짜
}
