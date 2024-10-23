package com.lostay.backend.user.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.lostay.backend.oauth2.service.CustomOAuth2User;

@Service
public class UserService {
	public Long getCurrentUserNo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.getPrincipal() instanceof CustomOAuth2User) {
            CustomOAuth2User customUser = (CustomOAuth2User) authentication.getPrincipal();
            return customUser.getUserNo(); // userNo 반환
        }
        
        return null; // 인증되지 않은 경우
    }
}
