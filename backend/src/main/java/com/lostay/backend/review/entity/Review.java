package com.lostay.backend.review.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
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
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long review_no;						// 리뷰넘버
	
	@JoinColumn(name = "room_no", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL)
	private Room room;						// 객실넘버 외래키
	
	@JoinColumn(name = "user_no", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL)
	private User user;						// 회원넘버 외래키
	
	private int review_rating;					// 리뷰별점
	private String review_content;				// 리뷰내용
	@Lob
	private String review_img;					// 리뷰이미지
	private LocalDateTime review_create_At;		// 작성날짜
}
