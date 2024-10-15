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
    	
    	String token = ((HttpServletRequest)request).getHeader("Auth");
    	
    	// 인증이 필요 없는 경로 확인
        if (token != null) {
            filterChain.doFilter(request, response); // 인증이 필요 없는 경우 필터를 통과

	    	String accessToken = null;
	    	
			Cookie[] cookies = request.getCookies();
			
			for(Cookie cookie : cookies) {
				if(cookie.getName().equals("access")) {
					accessToken = cookie.getValue();
				}
			}
	    	
	    	// access 토큰이 없다면 필터로 넘김
	    	if(accessToken == null) {
	    		filterChain.doFilter(request, response);
	    		
	    		return;
	    	}
	    
	
	        //토큰 만료 여부 확인
	    	try {
				
	    		jwtUtil.isExpired(accessToken);
			} catch (ExpiredJwtException e) {
				 System.out.println("token expired");
				 
				 // response body
				 PrintWriter writer = response.getWriter();
				 writer.print("access token expired");
	
				 // response status code
				 // 프론트와 협의한 코드 보내기
				 response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		         
		           return;
	        }
	
	    	// 토큰이 access인지 확인 (발급시 페이로드에 명시)
	    	String category = jwtUtil.getCategoty(accessToken);
	    	
	    	if(!category.equals("access")) {
	    		
	    		// response body
	    		PrintWriter writer = response.getWriter();
	    		writer.print("invalid access token");
	    		
	    		// response status code
	    		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	    		return;
	    	}
	    	
	    	
	        //토큰에서 username과 role 획득
	        String username = jwtUtil.getUsername(accessToken);
	        String role = jwtUtil.getRole(accessToken);
	
	        //userDTO를 생성하여 값 set
	        UserDTO userDTO = new UserDTO();
	        userDTO.setUserName(username);
	        userDTO.setUserRole(role);
	
	        //UserDetails에 회원 정보 객체 담기
	        CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDTO);
	
	        //스프링 시큐리티 인증 토큰 생성
	        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
	        
	        //세션에 사용자 등록
	        SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }
    
    private boolean isAuthRequired(String path) {
        return path.startsWith("/mypage/*") || 
               path.startsWith("/whislist/*"); // 예시로 추가한 인증이 필요한 경로
        
    }
}