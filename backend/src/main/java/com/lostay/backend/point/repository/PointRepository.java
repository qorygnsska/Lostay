package com.lostay.backend.point.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lostay.backend.point.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long> {

	
	@Query("SELECT u FROM User u LEFT JOIN FETCH u.points WHERE u.userNo = :userNo")
	List<Point> findByUserNoWithPoints(Long userNo);



}
