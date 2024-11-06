package com.lostay.backend.jwt;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.user.dto.UserDTO;

import io.jsonwebtoken.ExpiredJwtException;



public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {        
    	
    	
    	String accessToken = request.getHeader("Authorization");
    	System.out.println("accessToken 값 : "+ accessToken);

    	if (accessToken == null) {
    	    filterChain.doFilter(request, response);

    	    return;
    	}
    	
    	accessToken = accessToken.replace("Bearer ", "");

    	// 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
    	try {
    	    jwtUtil.isExpired(accessToken);
    	} catch (ExpiredJwtException e) {
    		System.out.println("access 톤큰 만료다잉");
    	    //response body
    	    response.setContentType("application/json");
    	    PrintWriter writer = response.getWriter();
    	    writer.print("{\"message\": \"expired\"}");
    	    //response status code
    	    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    	    return;
    	}

    	// 토큰이 access인지 확인 (발급시 페이로드에 명시)
    	String category = jwtUtil.getCategory(accessToken);

    	if (!category.equals("access")) {
    	    //response body
    	    response.setContentType("application/json");
    	    PrintWriter writer = response.getWriter();
    	    writer.print("{\"message\": \"invalid access token\"}");

    	    //response status code
    	    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    	    return;
    	}

    	// username, role 값을 획득
    	String username = jwtUtil.getUsername(accessToken);
    	String role = jwtUtil.getRole(accessToken);
    	Long userNo = jwtUtil.getUserNo(accessToken);
    	System.out.println("JWT: admin No " + userNo);
    	UserDTO userDTO = new UserDTO();
    	userDTO.setUserName(username);
    	userDTO.setUserRole(role);
    	userDTO.setUserNo(userNo);
    	CustomOAuth2User CustomOAuth2User = new CustomOAuth2User(userDTO,false);

    	Authentication authToken = new UsernamePasswordAuthenticationToken(CustomOAuth2User, null, CustomOAuth2User.getAuthorities());
    	SecurityContextHolder.getContext().setAuthentication(authToken);


    	filterChain.doFilter(request, response);
    }
    
}