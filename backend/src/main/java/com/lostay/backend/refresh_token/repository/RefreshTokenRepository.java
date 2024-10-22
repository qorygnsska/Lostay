package com.lostay.backend.refresh_token.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.refresh_token.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{

	Boolean existsByRtToken(String refresh);

	@Transactional
	void deleteByRtToken(String refresh);
}
