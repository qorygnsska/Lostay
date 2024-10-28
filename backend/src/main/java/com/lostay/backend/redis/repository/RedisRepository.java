package com.lostay.backend.redis.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.lostay.backend.refresh_token.entity.RefreshToken;

public interface RedisRepository extends CrudRepository<RefreshToken, String>{

	Optional<RefreshToken> findByRefreshToken(String refreshToken);
	Optional<RefreshToken> findByUserProviderId(String userProviderId);
	Optional<RefreshToken> findUserProviderIdByRefreshToken(String refreshToken);
	void deleteByUserProviderId(String key);
}
