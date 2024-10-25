package com.lostay.backend.event.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.event.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

	Page<Event> findByEventTitleContaining(String eventTitle, Pageable pageable);

}
