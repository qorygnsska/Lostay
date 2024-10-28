package com.lostay.backend.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.admin.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

	Admin findByAdminId(String id);

}
