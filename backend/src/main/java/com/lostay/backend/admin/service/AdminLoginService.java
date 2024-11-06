package com.lostay.backend.admin.service;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.lostay.backend.admin.entity.Admin;
import com.lostay.backend.admin.repository.AdminRepository;
import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.redis.repository.AdminRedisRepository;
import com.lostay.backend.redis.repository.RedisRepository;
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
	private AdminRedisRepository adminRedisRepo;

	@Autowired
	private final RefreshTokenService refreshTokenService;

	@Autowired
	private final JWTUtil jwtutil;

	private Long refreshTkExpired = 24 * 60 * 60 * 1000L; // 1일

	// 로그인 체크
	public boolean loginAdmin(String id, String pw, HttpServletResponse response) {

		try {
			Admin adminEntity = adminRepo.findByAdminId(id);

			Long adminNo = adminEntity.getAdminNo();

			if (adminEntity.getAdminId().equals(id) && adminEntity.getAdminPw().equals(pw)) {

				String refreshToken = jwtutil.createJwt("refresh", "admin", "ROLE_ADMIN", adminNo, refreshTkExpired);

				addRefreshEntity(adminEntity.getAdminId(), refreshToken);

				response.addCookie(createCookie("refresh", refreshToken));

				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			return false;
		}

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
		adminRefreshTokenDTO.setAdminId(adminId);
		adminRefreshTokenDTO.setRefreshToken(refresh);

		refreshTokenService.create(adminRefreshTokenDTO);
	}

	
	//관리자 로그아웃(레디스 삭제)
	public boolean logoutAdmin(Long adminNo) {
		System.out.println("AdminLoginService.logoutAdmin()");
		try {
			//DB Admin테이블에서 토큰에서 가져온 adminNo와 일치하는 친구가 있는지 확인
			Optional<Admin> adminEntityOption = adminRepo.findById(adminNo);
			Admin admin = adminEntityOption.orElseThrow(() -> new RuntimeException("Admin not found"));
			System.out.println("AdminLoginService.admin: " + admin.toString());
			
			//PrimaryKey(AdminNo)가 아닌 AdminId로 토큰 관리
			String adminId = admin.getAdminId();
			System.out.println("AdminLoginService.adminId: " + adminId);

			adminRedisRepo.deleteById(adminId);//boolean타입으로 리턴할 수 없음(void)
			System.out.println("Redis에서 지웠다");
			return true;
		}catch(Exception e) {
			return false;
		}
	}
	
	
	
	
	
}
