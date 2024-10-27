package com.lostay.backend.refresh_token.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
// @RedisHash - 설정한 값을 Redis의 key값 prefix로 사용한다.
@RedisHash(value = "refreshToken", timeToLive = 86400) // 1일설정
public class RefreshToken {

	// @Id - 키(key) 값이 되며, refresh_token:{id} 위치에 auto-increment된다.
	@Id
	private String userProviderId;
	
	// @Indexed - 값으로 검색을 할 시에 추가한다.
	@Indexed
	private String refreshToken;
	
	public RefreshToken update(String refreshToken) {
	    this.refreshToken = refreshToken;
	    return this;
	}
}
