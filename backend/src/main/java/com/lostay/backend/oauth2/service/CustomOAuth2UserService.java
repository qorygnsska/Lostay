package com.lostay.backend.oauth2.service;


import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.lostay.backend.oauth2.dto.GoogleResponse;
import com.lostay.backend.oauth2.dto.NaverResponse;
import com.lostay.backend.oauth2.dto.OAuth2Response;
import com.lostay.backend.user.dto.UserDTO;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;
import com.lostay.backend.rdm_nickname.RDMNickname;


@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final RDMNickname RDMNickname;
    
    public CustomOAuth2UserService(UserRepository userRepository, RDMNickname rdmNickname) {

        this.userRepository = userRepository;
		this.RDMNickname = rdmNickname;
    }
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    	
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {
        	
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else {

            return null;
        }

        String userToken = oAuth2Response.getProvider()+"_"+oAuth2Response.getProviderId();
        User existData = userRepository.findByUserToken(userToken);
        if (existData == null) {
        	
            String nickname = getNickname(); 
           
            User user = new User();
            user.setUserName(oAuth2Response.getName());
            user.setUserEmail(oAuth2Response.getEmail());
            user.setUserToken(userToken);
            user.setUserRole("ROLE_USER");
            user.setUserNickname(nickname);
            
            userRepository.save(user);
            
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(user.getUserName());
            userDTO.setUserEmail(user.getUserEmail());
            userDTO.setUserToken(user.getUserToken());
            userDTO.setUserRole(user.getUserRole());
            
            return new CustomOAuth2User(userDTO);
        } else {
        	
        	existData.setUserName(oAuth2Response.getName());
        	existData.setUserEmail(oAuth2Response.getEmail());
        	
        	
            userRepository.save(existData);
            
         	UserDTO userDTO = new UserDTO();

            userDTO.setUserName(existData.getUserName());
            userDTO.setUserEmail(existData.getUserEmail());
            userDTO.setUserToken(existData.getUserToken());
            userDTO.setUserRole(existData.getUserRole());

            return new CustomOAuth2User(userDTO);
        }
    }
    
    public String getNickname() {
    	String nickname = null;
        do {
            nickname = RDMNickname.generate();
        } while (userRepository.existsByUserNickname(nickname)); // 닉네임 중복 체크
       
        return nickname;
    }
}

