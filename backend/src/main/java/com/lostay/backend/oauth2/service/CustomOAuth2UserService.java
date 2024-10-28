package com.lostay.backend.oauth2.service;


import java.util.List;
import java.util.Optional;

import javax.persistence.NonUniqueResultException;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.oauth2.dto.GoogleResponse;
import com.lostay.backend.oauth2.dto.KakaoResponse;
import com.lostay.backend.oauth2.dto.NaverResponse;
import com.lostay.backend.oauth2.dto.OAuth2Response;
import com.lostay.backend.user.dto.UserDTO;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;
import com.lostay.backend.rdm_nickname.RDMNickname;


@Service
@Transactional
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
        
        System.out.println(oAuth2User.getAttributes());
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) { oAuth2Response = new NaverResponse(oAuth2User.getAttributes()); } 
        else if (registrationId.equals("google")) { oAuth2Response = new GoogleResponse(oAuth2User.getAttributes()); } 
        else if (registrationId.equals("kakao")) {oAuth2Response = new KakaoResponse(oAuth2User.getAttributes()); }
        else { return null;}

        String userProviderId = oAuth2Response.getProvider()+"_"+oAuth2Response.getProviderId();
        String userStatus = "Y";
   
        Optional<User> user = userRepository.findFirstByUserProviderIdAndUserStatus(userProviderId, userStatus);
        
        
        if (!user.isPresent()) {
        	
            String nickname = getNickname();
            
            UserDTO userDTO = createUser(oAuth2Response, userProviderId, nickname);
            
            boolean isNewUser = true;
            
            return new CustomOAuth2User(userDTO,isNewUser);
        } else {
        	User existData = user.get();
        	updateUser(existData, oAuth2Response);
            
         	UserDTO userDTO = new UserDTO();

         	userDTO.setUserNo(existData.getUserNo());
            userDTO.setUserName(existData.getUserName());
            userDTO.setUserEmail(existData.getUserEmail());
            userDTO.setUserProviderId(existData.getUserProviderId());
            userDTO.setUserRole(existData.getUserRole());

            boolean isNewUser = false;
            if(existData.getUserPhone() == null) {
            	isNewUser = true;
            }
            
            
            return new CustomOAuth2User(userDTO,isNewUser);
        }
    }
    
    public String getNickname() {
    	String nickname = null;
        do {
            nickname = RDMNickname.generate();
        } while (userRepository.existsByUserNickname(nickname)); // 닉네임 중복 체크
       
        return nickname;
    }
    

    public UserDTO createUser(OAuth2Response oAuth2Response, String userProviderId, String nickname) {
    	 User user = new User();
         user.setUserName(oAuth2Response.getName());
         user.setUserEmail(oAuth2Response.getEmail());
         user.setUserProviderId(userProviderId);
         user.setUserRole("ROLE_USER");
         user.setUserNickname(nickname);
    
         
         userRepository.save(user);
         Optional<User> optionalUser = userRepository.findFirstByUserProviderIdAndUserStatus(userProviderId, "Y");
         User existData = optionalUser.get();
         UserDTO userDTO = new UserDTO();
         userDTO.setUserNo(existData.getUserNo());
         userDTO.setUserName(existData.getUserName());
         userDTO.setUserEmail(existData.getUserEmail());
         userDTO.setUserProviderId(existData.getUserProviderId());
         userDTO.setUserRole(existData.getUserRole());
        return userDTO;
    }
    
 
    public void updateUser(User user, OAuth2Response oAuth2Response) {
        user.setUserName(oAuth2Response.getName());
        user.setUserEmail(oAuth2Response.getEmail());
        userRepository.save(user);
    }
}

