package com.lostay.backend.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.hotel.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long>{

}
