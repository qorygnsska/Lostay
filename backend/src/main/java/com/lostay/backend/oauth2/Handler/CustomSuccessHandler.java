package com.lostay.backend.oauth2.Handler;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.oauth2.service.CustomOAuth2User;


// 소셜 로그인 성공 시
@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    public CustomSuccessHandler(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String username = customOAuth2User.getName();
        Long userNo = customOAuth2User.getNo();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String refreshToken = jwtUtil.createJwt("refresh",username, role, userNo, 24 * 60 * 60 * 60L); // 1일 유지

        response.addCookie(createCookie("refresh", refreshToken));
        response.sendRedirect("http://localhost:3000/login-popup?success=true");
    }

    // 쿠키 만들기
    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*60);     // 1시간 유지
        //cookie.setSecure(true);       // 오직 https 통신에서만 쿠키허용
        cookie.setPath("/");			// 쿠키가 보일 위치 -> 모든 전역에서 보인다
        cookie.setHttpOnly(true);		// js로 수정 불가능하다

        return cookie;
    }
}
