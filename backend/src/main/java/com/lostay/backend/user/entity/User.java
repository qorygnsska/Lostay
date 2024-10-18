package com.lostay.backend.user.entity;


import java.time.LocalDateTime;

import java.util.Set;

import javax.persistence.*;


import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.refresh_token.entity.Refresh_Token;
import com.lostay.backend.review.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_no")
	private Long userNo;       // 회원넘버
	

	@Column(nullable = false, name="user_name")
	private String userName;		// 회원이름
	
	@Column(nullable = false, name="user_nickname")
	private String userNickname;	// 회원닉네임
	
	@Column(nullable = false, name="user_email")
	private String userEmail;		// 회원이메일
	
	@Column(name="user_phone")
	private String userPhone;		// 전화번호
	
	@Column(nullable = false, name="user_point")
	private int userPoint;			// 회원포인트
	
	@Column(nullable = false, name="user_role")
	private String userRole;		// 역할
	
	@Column(nullable = false, name="user_status")
	private String userStatus;		// 탈퇴여부
	
	@Column(nullable = false, updatable = false, name="user_create_at")
	private String userCreateAt;	// 가입일자
	
	@Column(nullable = false, name="user_token")
	private String userToken;		// 소셜토큰
	
	
	@PrePersist
    protected void onCreate() {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        this.userCreateAt = LocalDateTime.now().format(formatter);
		this.userPoint = 0;
		this.userStatus = "Y";
		this.userCreateAt = LocalDateTime.now().toString();
    }
	 

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Cart 엔티티와의 관계 설정
    @ToString.Exclude
    private Set<Cart> carts; // 카트 목록
    
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY) // room 엔티티와의 관계 설정
	@ToString.Exclude
	private Set<Review> reviews; // 리뷰 목록
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY) // room 엔티티와의 관계 설정
	@ToString.Exclude
	private Set<Payment> payments; // 결제 목록
	
	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY) // room 엔티티와의 관계 설정
	@ToString.Exclude
	private Refresh_Token refresh_tokens; // 리프레쉬 토큰 목록
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY) // room 엔티티와의 관계 설정
	@ToString.Exclude
	private Set<Point> points; // 포인트 목록
}










