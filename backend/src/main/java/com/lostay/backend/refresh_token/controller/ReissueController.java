package com.lostay.backend.refresh_token.controller;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.refresh_token.service.RefreshTokenService;
import com.lostay.backend.user.repository.UserRepository;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;

@RestController
@Transactional
@RequiredArgsConstructor
public class ReissueController {

	private final JWTUtil jwtUtil;

    private final RefreshTokenService refreshTokenService;
	private Long refreshTkExpired = 24 * 60 * 60 * 1000L; // 1일
	private Long accessTkExpired = 60 * 60 * 1000L; // 1시간


	@PostMapping("/reissue")
	public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

		// 쿠키에서 리프레쉬토큰 가져오기
		String refresh = null;
		Cookie[] cookies = request.getCookies();
	
		if (cookies == null) {
			return new ResponseEntity<>("No cookies found", HttpStatus.BAD_REQUEST);
		}

		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("refresh")) {

				refresh = cookie.getValue();
			}
		}

		// 토큰 존재여부 확인
		if (refresh == null) {
			return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
		}

		// 토큰 만료여부 확인
		try {
			jwtUtil.isExpired(refresh);
		} catch (ExpiredJwtException e) {
			String userProviderId = refreshTokenService.getKey(refresh);
			
			if(userProviderId != null) {
				refreshTokenService.delete(userProviderId);	
			}
			
			return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(refresh);
		if (!category.equals("refresh")) {
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}
		
		// 토큰 DB에 저장되어 있는지 확인
		Boolean isExist = refreshTokenService.existsRefreshToken(refresh);
		if (!isExist) {			
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		String username = jwtUtil.getUsername(refresh);
		String role = jwtUtil.getRole(refresh);
		Long userNo = jwtUtil.getUserNo(refresh);

		// 새로 발급할 토큰 생성
		String newAccess = jwtUtil.createJwt("access", username, role, userNo, accessTkExpired);
		String newRefresh = jwtUtil.createJwt("refresh", username, role, userNo, refreshTkExpired);

		System.out.println("기존 리프레쉬 토큰" + refresh);
		System.out.println("새로운 리프레쉬 토큰" + newRefresh);
		
		// Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
//		String userProviderId = refreshTokenService.getKey(newRefresh);
//		
//		RefreshTokenDTO refreshTokenDTO = new RefreshTokenDTO();
//		refreshTokenDTO.setUserProviderId(userProviderId);
//		refreshTokenDTO.setRefreshToken(newRefresh);			
		
		refreshTokenService.update(refresh, newRefresh, userNo);
		
		
		// 응답 설정
		//response.setHeader("Access-Control-Expose-Headers", "access");
		response.setHeader("Authorization", "Bearer " + newAccess);
		response.addCookie(createCookie("refresh", newRefresh));
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/newAccess")
	public ResponseEntity<?> newAccess(HttpServletRequest request, HttpServletResponse response) {

		// 쿠키에서 리프레쉬토큰 가져오기
		String refresh = null;
		Cookie[] cookies = request.getCookies();
	
		if (cookies == null) {
			return new ResponseEntity<>("No cookies found", HttpStatus.BAD_REQUEST);
		}

		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("refresh")) {

				refresh = cookie.getValue();
			}
		}

		// 토큰 존재여부 확인
		if (refresh == null) {
			return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
		}

		// 토큰 만료여부 확인
		try {
			jwtUtil.isExpired(refresh);
		} catch (ExpiredJwtException e) {
			
			String userProviderId = refreshTokenService.getKey(refresh);
			
			if(userProviderId != null) {
				refreshTokenService.delete(userProviderId);	
			}			
			
			return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(refresh);
		if (!category.equals("refresh")) {
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		String username = jwtUtil.getUsername(refresh);
		String role = jwtUtil.getRole(refresh);
		Long userNo = jwtUtil.getUserNo(refresh);

		// 새로 발급할 토큰 생성
		String newAccess = jwtUtil.createJwt("access", username, role, userNo, accessTkExpired);

		// 응답 설정
		//response.setHeader("Access-Control-Expose-Headers", "access");
		response.setHeader("Authorization", "Bearer " + newAccess);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 쿠키 만들기
	private Cookie createCookie(String key, String value) {

		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(refreshTkExpired.intValue()); // 1일 유지
		// cookie.setSecure(true); // 오직 https 통신에서만 쿠키허용
		cookie.setPath("/"); // 쿠키가 보일 위치 -> 모든 전역에서 보인다
		cookie.setHttpOnly(true); // js로 수정 불가능하다

		return cookie;
	}
}
