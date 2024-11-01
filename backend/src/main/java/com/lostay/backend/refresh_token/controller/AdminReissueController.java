package com.lostay.backend.refresh_token.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.refresh_token.service.RefreshTokenService;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;

@RestController
@Transactional
@RequiredArgsConstructor
@RequestMapping("/adminReissue")
public class AdminReissueController {
	private final JWTUtil jwtUtil;
	

	private final RefreshTokenService refreshTokenService;

	private Long refreshTkExpired = 24 * 60 * 60 * 1000L; // 1일
	private Long accessTkExpired = 60 * 60 * 1000L; // 1시간
	
	@PostMapping("")//변경전: /adminReissue 변경후:/admin/Reissue
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
			String adminId = refreshTokenService.adminGetKey(refresh);

			if (adminId != null) {
				refreshTokenService.adminDelete(adminId);
			}

			return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(refresh);
		if (!category.equals("refresh")) {
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		// 토큰 DB에 저장되어 있는지 확인
		Boolean isExist = refreshTokenService.existsAdminRefreshToken(refresh);
		if (!isExist) {
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		String role = jwtUtil.getRole(refresh);
		Long adminNo = jwtUtil.getUserNo(refresh);

		// 새로 발급할 토큰 생성
		String newAccess = jwtUtil.createJwt("access", "admin", role, adminNo, accessTkExpired);
		String newRefresh = jwtUtil.createJwt("refresh", "admin", role, adminNo, refreshTkExpired);
			

		refreshTokenService.update(refresh, newRefresh, adminNo);

		// 응답 설정
		// response.setHeader("Access-Control-Expose-Headers", "access");
		response.setHeader("Authorization", "Bearer " + newAccess);
		response.addCookie(createCookie("refresh", newRefresh));

		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/NewAccess")//변경전: /adminNewAccess 변경후:/admin/NewAccess
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

		return createAccess(request, response, refresh);
	}
	
	private ResponseEntity<?> createAccess(HttpServletRequest request, HttpServletResponse response, String refresh) {

		// 토큰 존재여부 확인
		if (refresh == null) {
			return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
		}

		// 토큰 만료여부 확인
		try {
			jwtUtil.isExpired(refresh);
		} catch (ExpiredJwtException e) {

			String adminId = refreshTokenService.adminGetKey(refresh);

			if (adminId != null) {
				refreshTokenService.delete(adminId);
			}

			return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(refresh);
		if (!category.equals("refresh")) {
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		String role = jwtUtil.getRole(refresh);
		Long admindNo = jwtUtil.getUserNo(refresh);

		// 새로 발급할 토큰 생성
		String newAccess = jwtUtil.createJwt("access", "admin", role, admindNo, accessTkExpired);

		// 응답 설정
		// response.setHeader("Access-Control-Expose-Headers", "access");
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
