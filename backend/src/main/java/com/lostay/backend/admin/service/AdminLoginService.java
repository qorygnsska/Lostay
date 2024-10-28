package com.lostay.backend.admin.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.admin.entity.Admin;
import com.lostay.backend.admin.repository.AdminRepository;
import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.refresh_token.dto.AdminRefreshTokenDTO;
import com.lostay.backend.refresh_token.service.RefreshTokenService;
import com.lostay.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminLoginService {

	@Autowired
	private final AdminRepository adminRepo;
	
	@Autowired
	private final RefreshTokenService refreshTokenService;

	@Autowired
	private final JWTUtil jwtutil;

	private Long refreshTkExpired = 24 * 60 * 60 * 1000L; // 1일
	
	
	// 로그인 체크
	public Object loginAdmin(String id, String pw, HttpServletResponse response) {

		Admin adminEntity =adminRepo.findByAdminId(id);
		Long adminNo = adminEntity.getAdminNo();

		String refreshToken = jwtutil.createJwt("refresh", "admin", "ROLE_ADMIN", adminNo, refreshTkExpired);

		addRefreshEntity(adminEntity.getAdminId(), refreshToken);

		response.addCookie(createCookie("refresh", refreshToken));
		return adminEntity;
	}

	// 쿠키 만들기
	private Cookie createCookie(String key, String value) {

		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(refreshTkExpired.intValue()); // 1시간 유지
		// cookie.setSecure(true); // 오직 https 통신에서만 쿠키허용
		cookie.setPath("/"); // 쿠키가 보일 위치 -> 모든 전역에서 보인다
		cookie.setHttpOnly(true); // js로 수정 불가능하다

		return cookie;
	}

	// redis에 리프레쉬 토큰 저장
	private void addRefreshEntity(String adminId, String refresh) {


		AdminRefreshTokenDTO adminRefreshTokenDTO = new AdminRefreshTokenDTO();
		adminRefreshTokenDTO.setAdminId(adminId);;
		adminRefreshTokenDTO.setRefreshToken(refresh);

		refreshTokenService.create(adminRefreshTokenDTO);
	}
}
