package com.lostay.backend.location.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.location.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {

}
