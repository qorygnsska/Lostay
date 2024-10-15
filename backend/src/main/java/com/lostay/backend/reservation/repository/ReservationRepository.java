package com.lostay.backend.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{

}
