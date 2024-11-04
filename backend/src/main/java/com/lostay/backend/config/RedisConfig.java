package com.lostay.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
       
     // 일반적인 key:value의 경우 시리얼라이저
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());

//        // Hash를 사용할 경우 시리얼라이저
//        template.setHashKeySerializer(new StringRedisSerializer());
//        template.setHashValueSerializer(new StringRedisSerializer());

//        // 모든 경우
//        template.setDefaultSerializer(new StringRedisSerializer());
        
        return template;
    }
}