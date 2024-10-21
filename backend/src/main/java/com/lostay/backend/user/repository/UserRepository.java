package com.lostay.backend.user.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUserToken(String userToken);

	boolean existsByUserNickname(String nickname);



}
