package com.lostay.backend.refresh_token.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.jwt.JWTUtil;

import io.jsonwebtoken.ExpiredJwtException;

@RestController
public class ReissueController {

	private final JWTUtil jwtUtil;

	public ReissueController(JWTUtil jwtUtil) {

		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/reissue")
	public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

		// get refresh token
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

		if (refresh == null) {
			// response status code
			return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
		}

		// expired check
		try {
			jwtUtil.isExpired(refresh);
		} catch (ExpiredJwtException e) {
			// response status code
			return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(refresh);
		if (!category.equals("refresh")) {
			// response status code
			return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
		}

		String username = jwtUtil.getUsername(refresh);
		String role = jwtUtil.getRole(refresh);
		Long userNo = jwtUtil.getUserNo(refresh);

		// make new JWT
		String newAccess = jwtUtil.createJwt("access", username, role, userNo, 60 * 60 * 60L);
		String newRefresh = jwtUtil.createJwt("refresh", username, role, userNo, 24 * 60 * 60L);

		// response
		response.setHeader("Access-Control-Expose-Headers", "access");
		response.setHeader("access", newAccess);
		response.addCookie(createCookie("refresh", newRefresh));

		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 쿠키 만들기
	private Cookie createCookie(String key, String value) {

		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(60 * 60 * 60); // 1시간 유지
		// cookie.setSecure(true); // 오직 https 통신에서만 쿠키허용
		cookie.setPath("/"); // 쿠키가 보일 위치 -> 모든 전역에서 보인다
		cookie.setHttpOnly(true); // js로 수정 불가능하다

		return cookie;
	}
}
