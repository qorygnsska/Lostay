package com.lostay.backend.user.entity;

import java.util.Set;

import javax.persistence.*;

import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.refresh_token.entity.Refresh_Token;
import com.lostay.backend.review.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userNo;       // 회원넘버
	
	private String userName;		// 회원이름
	private String userNickname;	// 회원닉네임
	private String userEmail;		// 회원이메일
	private String userPhone;		// 전화번호
	private int userPoint;			// 회원포인트
	private String userRole;		// 역할
	private String userStatus;	// 탈퇴여부
	private String userCreateAt;	// 가입일자
	private String userToken;		// 소셜토큰
	 

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL) // Cart 엔티티와의 관계 설정
    private Set<Cart> carts; // 카트 목록
    
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL) // room 엔티티와의 관계 설정
	private Set<Review> reviews; // 리뷰 목록
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL) // room 엔티티와의 관계 설정
	private Set<Payment> payments; // 결제 목록
	
	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL) // room 엔티티와의 관계 설정
	private Refresh_Token refresh_tokens; // 리프레쉬 토큰 목록
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL) // room 엔티티와의 관계 설정
	private Set<Point> points; // 포인트 목록
}










