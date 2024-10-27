package com.lostay.backend.refresh_token.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.redis.repository.RedisRepository;
import com.lostay.backend.refresh_token.dto.RefreshTokenDTO;
import com.lostay.backend.refresh_token.entity.RefreshToken;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenService {
	
	@Autowired
	private final RedisRepository redisRepo;
	private final UserRepository userRepo;
	
	
	// 생성
	public void create(RefreshTokenDTO refreshTokenDTO) {
		RefreshToken refreshTokenEntity = RefreshToken.builder()
										    .userProviderId(refreshTokenDTO.getUserProviderId())
										    .refreshToken(refreshTokenDTO.getRefreshToken())
										    .build();
									
		redisRepo.save(refreshTokenEntity);
	}
	
	// Key 찾기
	public String getKey(String refreshToken) {
		
		Optional<RefreshToken> existingToken = redisRepo.findUserProviderIdByRefreshToken(refreshToken); 
	
		if (existingToken.isPresent()) {
	        // 값이 있을 때
	        RefreshToken token = existingToken.get();
	        return token.getUserProviderId(); // 실제 키 반환
	    } 
	      
	    return null;

	}

	// 가져오기
	public boolean existsRefreshToken(String refreshToken) {
		
		Optional<RefreshToken> optionalToken = redisRepo.findByRefreshToken(refreshToken);
		
		return optionalToken.isPresent();
	}

	// 업데이트
	public void update(String refreshToken, String newRefreshToken, Long userNo) {
		
		Optional<RefreshToken> existingToken = redisRepo.findUserProviderIdByRefreshToken(refreshToken);

		if(existingToken.isPresent()) {
			RefreshToken refreshTokenEntity = existingToken.get();
			refreshTokenEntity.update(newRefreshToken);
			redisRepo.save(refreshTokenEntity);	
		}else { // 도중에 만료 되었을 때 예외
			Optional<User> result = userRepo.findById(userNo);
			User user = result.get();
			
			RefreshToken reRefreshToken = RefreshToken.builder()
														.userProviderId(user.getUserProviderId())
														.refreshToken(newRefreshToken)
														.build();
			redisRepo.save(reRefreshToken);
		}
	}

	// 삭제
	public void delete(String key) {
		redisRepo.deleteById(key);
	}
}
