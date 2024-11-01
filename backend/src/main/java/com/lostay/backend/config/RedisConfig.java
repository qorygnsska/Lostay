package com.lostay.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.lostay.backend.room.entity.RoomCheck;

@Configuration
public class RedisConfig {

	@Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }
    
    @Bean
    public RedisTemplate<String, RoomCheck> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, RoomCheck> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        
        template.setKeySerializer(new StringRedisSerializer()); // 키는 문자열로
        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(RoomCheck.class)); // 값은 JSON으로
        
        return template;
    }
}