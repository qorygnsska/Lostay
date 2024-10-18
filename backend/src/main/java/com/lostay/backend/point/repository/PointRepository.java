package com.lostay.backend.point.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.point.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long> {



}
