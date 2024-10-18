package com.lostay.backend.point.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lostay.backend.point.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long> {

	

	@Query("SELECT p FROM Point p LEFT JOIN FETCH p.user WHERE p.user.userNo = :userNo")
	List<Point> findByUserNoWithPoints(@Param("userNo") Long userNo);

}
