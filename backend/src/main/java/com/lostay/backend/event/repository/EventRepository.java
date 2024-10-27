package com.lostay.backend.event.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.event.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

	Page<Event> findByEventTitleContaining(String eventTitle, Pageable pageable);

	Page<Event> findByEventCreateAtLessThanAndEventEndAtGreaterThan(LocalDateTime now, LocalDateTime now2,
			Pageable pageable);

	Page<Event> findByEventTitleContainingAndEventCreateAtLessThanAndEventEndAtGreaterThan(String eventTitle,
			LocalDateTime now, LocalDateTime now2, Pageable pageable);

}
