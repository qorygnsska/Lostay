package com.lostay.backend.redis.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.lostay.backend.admin.entity.Admin;
import com.lostay.backend.refresh_token.entity.AdminRefreshToken;
import com.lostay.backend.refresh_token.entity.RefreshToken;

public interface AdminRedisRepository extends CrudRepository<AdminRefreshToken, String>{

	Optional<AdminRefreshToken> findAdminIdByRefreshToken(String refreshToken);

	Optional<RefreshToken> findByRefreshToken(String refreshToken);

	Optional<Admin> findByAdminNo(Long adminNo);

	void deleteByAdminId(String adminId);

}
