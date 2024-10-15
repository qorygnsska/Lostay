package com.lostay.backend.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.event.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

}
