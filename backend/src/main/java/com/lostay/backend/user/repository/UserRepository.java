package com.lostay.backend.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.adminpage.dto.AdminReviewDTO;
import com.lostay.backend.adminpage.dto.AdminUserDTO;
import com.lostay.backend.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUserProviderId(String userProviderId);

	boolean existsByUserNickname(String nickname);

	
	
	
	
	//관리자 유저정보 조회(이름검색)
	 @Query("SELECT new com.lostay.backend.adminpage.dto.AdminUserDTO(u.userNo,u.userName,u.userNickname,u.userEmail,u.userPhone,u.userCreateAt,u.userPoint,u.userStatus) " +
	           "FROM User u " +
	           "WHERE u.userName LIKE CONCAT('%', :userName, '%')")
	Page<AdminUserDTO> adminUserPageSearch(@Param("userName") String userName, Pageable pageable);

	 
	//관리자 유저정보 조회(이름검색+비활성)
	 @Query("SELECT new com.lostay.backend.adminpage.dto.AdminUserDTO(u.userNo,u.userName,u.userNickname,u.userEmail,u.userPhone,u.userCreateAt,u.userPoint,u.userStatus) " +
	           "FROM User u " +
	           "WHERE u.userName LIKE CONCAT('%', :userName, '%')" +
	           "AND u.userStatus = 'N'")
	Page<AdminUserDTO> adminUserPageSearchInactive(@Param("userName") String userName, Pageable pageable);
	 
	 
	//관리자 유저정보 전체조회
	 @Query("SELECT new com.lostay.backend.adminpage.dto.AdminUserDTO(u.userNo,u.userName,u.userNickname,u.userEmail,u.userPhone,u.userCreateAt,u.userPoint,u.userStatus) " +
	           "FROM User u " 
	          )
	Page<AdminUserDTO> adminUserPage(PageRequest pageable);

	 
	 
	
}
