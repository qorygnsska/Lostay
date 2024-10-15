package com.lostay.backend.config;

import java.util.Collections;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.lostay.backend.jwt.JWTFilter;
import com.lostay.backend.jwt.JWTUtil;
import com.lostay.backend.oauth2.Handler.CustomFailureHandler;
import com.lostay.backend.oauth2.Handler.CustomSuccessHandler;
import com.lostay.backend.oauth2.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity // 시크릿을 위한 클래스이다
public class SecurityConfig {

	private final CustomOAuth2UserService customOAuth2UserService;
	private final CustomSuccessHandler customSuccessHandler;
	private final CustomFailureHandler customFailureHandler;
	private final JWTUtil jwtUtil;

	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, CustomSuccessHandler customSuccessHandler,
			CustomFailureHandler customFailureHandler, JWTUtil jwtUtil) {

		this.customOAuth2UserService = customOAuth2UserService;
		this.customSuccessHandler = customSuccessHandler;
		this.customFailureHandler = customFailureHandler;
		this.jwtUtil = jwtUtil;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration configuration = new CorsConfiguration();

				configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
				configuration.setAllowedMethods(Collections.singletonList("*")); // 모든 HTTP 메서드(GET, POST, PUT, DELETE,
																					// 등)를 허용
				configuration.setAllowCredentials(true); // 클라이언트가 쿠키나 HTTP 인증 정보를 사용할 수 있도록 허용
				configuration.setAllowedHeaders(Collections.singletonList("*")); // 모든 헤더를 허용하고 있어.
				configuration.setMaxAge(3600L); // CORS preflight 요청의 캐시를 1시간(3600초) 동안 유지할 수 있도록 설정

				// 클라이언트가 응답에서 사용할 수 있는 특정 헤더를 설정해. 여기서는 Set-Cookie와 Authorization 헤더를 노출
				configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
				configuration.setExposedHeaders(Collections.singletonList("Authorization"));

				return configuration;
			}
		}))
				.csrf((auth) -> auth.disable())// csrf disable
				.formLogin((auth) -> auth.disable()) // From 로그인 방식 disable
				.httpBasic((auth) -> auth.disable()) // HTTP Basic 인증 방식 disable

				// JWTFilter 추가
			//	.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)

				// oauth2
				.oauth2Login((oauth2) -> oauth2
						.userInfoEndpoint(
								(userInfoEndpointConfig) -> userInfoEndpointConfig.userService(customOAuth2UserService))
						.successHandler(customSuccessHandler).failureHandler(customFailureHandler))

				
//				.authorizeHttpRequests((auth) -> 
//						auth.antMatchers("/locationMain", "/reissue", "/hotelList/*", "/event/*").permitAll()
//							//.antMatchers("/mypage", "/whislist").hasAnyRole("USER")
//							.anyRequest().authenticated())

				.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/login"));

		return http.build();
	}
}
