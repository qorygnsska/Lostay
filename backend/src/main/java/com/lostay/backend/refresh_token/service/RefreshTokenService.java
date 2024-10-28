package com.lostay.backend.refresh_token.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.admin.entity.Admin;
import com.lostay.backend.redis.repository.AdminRedisRepository;
import com.lostay.backend.redis.repository.RedisRepository;
import com.lostay.backend.refresh_token.dto.AdminRefreshTokenDTO;
import com.lostay.backend.refresh_token.dto.RefreshTokenDTO;
import com.lostay.backend.refresh_token.entity.AdminRefreshToken;
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
	
	@Autowired
	private final AdminRedisRepository adminRedisRepo;
	
	@Autowired
	private final UserRepository userRepo;
	
	
	// 생성
	public void create(RefreshTokenDTO refreshTokenDTO) {
		RefreshToken refreshTokenEntity = RefreshToken.builder()
										    .userProviderId(refreshTokenDTO.getUserProviderId())
										    .refreshToken(refreshTokenDTO.getRefreshToken())
										    .build();
									
		redisRepo.save(refreshTokenEntity);
	}
	
	// 어드민 토큰 생성
	public void create(AdminRefreshTokenDTO adminRefreshTokenDTO) {
		AdminRefreshToken adminRefreshTokenEntity = AdminRefreshToken.builder()
												.adminId(adminRefreshTokenDTO.getAdminId())
												.refreshToken(adminRefreshTokenDTO.getRefreshToken())
												.build();
		adminRedisRepo.save(adminRefreshTokenEntity);
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
	
	// Admin Key 찾기
	public String adminGetKey(String refreshToken) {
		Optional<AdminRefreshToken> existingToken = adminRedisRepo.findAdminIdByRefreshToken(refreshToken); 
		
		if (existingToken.isPresent()) {
	        // 값이 있을 때
			AdminRefreshToken token = existingToken.get();
	        return token.getAdminId(); // 실제 키 반환
	    } 
	      
	    return null;
	}

	// 가져오기
	public boolean existsRefreshToken(String refreshToken) {
		
		Optional<RefreshToken> optionalToken = redisRepo.findByRefreshToken(refreshToken);
		
		return optionalToken.isPresent();
	}
	
	// 가져오기
	public boolean existsAdminRefreshToken(String refreshToken) {
		
		Optional<RefreshToken> optionalToken = adminRedisRepo.findByRefreshToken(refreshToken);
		
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
	
	// 어드민 업데이트
		public void adminUpdate(String refreshToken, String newRefreshToken, Long adminNo) {
			
			Optional<AdminRefreshToken> existingToken = adminRedisRepo.findAdminIdByRefreshToken(refreshToken);

			if(existingToken.isPresent()) {
				AdminRefreshToken adminRefreshTokenEntity = existingToken.get();
				adminRefreshTokenEntity.update(newRefreshToken);
				adminRedisRepo.save(adminRefreshTokenEntity);	
			}else { // 도중에 만료 되었을 때 예외
				Optional<Admin> result = adminRedisRepo.findByAdminNo(adminNo);
				Admin admin = result.get();
				
				AdminRefreshToken adminRefreshToken = AdminRefreshToken.builder()
															.adminId(admin.getAdminId())
															.refreshToken(newRefreshToken)
															.build();
				adminRedisRepo.save(adminRefreshToken);
			}
		}

	// 삭제
	public void delete(String key) {
		redisRepo.deleteById(key);
	}
	
	// 어드민 삭제
	public void adminDelete(String key) {
		adminRedisRepo.deleteById(key);
	}


}
