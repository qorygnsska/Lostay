package com.lostay.backend.review.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
	@Column(name="review_no")
	private Long reviewNo;						// 리뷰넘버
	
	@JoinColumn(name = "roomNo", nullable = false)
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JsonBackReference // Review에서 Room 방향
	private Room room;						// 객실넘버 외래키
	
	@JoinColumn(name = "userNo", nullable = false)
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JsonBackReference // Review에서 User 방향
	private User user;						// 회원넘버 외래키
	
	@Column(name="review_rating")
	private double reviewRating;					// 리뷰별점
	@Column(name="review_content")
	private String reviewContent;				// 리뷰내용
	@Lob
	@Column(name="review_img")
	private String reviewImg;					// 리뷰이미지
	@Column(name="review_create_at")
	private LocalDateTime reviewCreateAt;		// 작성날짜
	
	@Column(name="review_sanctions_at")
	private LocalDateTime reviewSanctionsAt;  //  제재날짜
}
