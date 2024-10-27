package com.lostay.backend.oauth2.Handler;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.redis.repository.RedisRepository;
import com.lostay.backend.refresh_token.dto.RefreshTokenDTO;
import com.lostay.backend.refresh_token.entity.RefreshToken;
import com.lostay.backend.refresh_token.service.RefreshTokenService;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;


// 소셜 로그인 성공 시
@Component
@Transactional
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepo;
    private final RefreshTokenService refreshTokenService;
    private Long refreshTkExpired = 24 * 60 * 60 * 1000L; // 1일


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

    	
    	// 유저 정보
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String username = customOAuth2User.getName();
        Long userNo = customOAuth2User.getUserNo();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // 리프레쉬 토큰 생성
        String refreshToken = jwtUtil.createJwt("refresh",username, role, userNo, refreshTkExpired); // 1일 유지
        
        // 리프레쉬 토큰 Redis 저장
        addRefreshEntity(userNo, refreshToken);

        // 응답 설정
        response.addCookie(createCookie("refresh", refreshToken));
        response.sendRedirect("http://localhost:3000/login-popup?success=true");
    }

    // 쿠키 만들기
    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(refreshTkExpired.intValue());     // 1시간 유지
        //cookie.setSecure(true);       // 오직 https 통신에서만 쿠키허용
        cookie.setPath("/");			// 쿠키가 보일 위치 -> 모든 전역에서 보인다
        cookie.setHttpOnly(true);		// js로 수정 불가능하다

        return cookie;
    }
    
    // redis에 리프레쉬 토큰 저장
    private void addRefreshEntity(Long userNo, String refresh) {
 
        Optional<User> findUser = userRepo.findById(userNo);       
        User user = findUser.get();
        
        System.out.println("userproid: " + user.getUserProviderId());
        System.out.println("refresh: " + refresh);
        
        RefreshTokenDTO refreshTokenDTO = new RefreshTokenDTO();
        refreshTokenDTO.setUserProviderId(user.getUserProviderId());
        refreshTokenDTO.setRefreshToken(refresh);
        
        refreshTokenService.create(refreshTokenDTO);
    }
}
