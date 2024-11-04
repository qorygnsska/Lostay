package com.lostay.backend.event.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.event.dto.EventDTO;
import com.lostay.backend.event.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

	//관리자페이지: 전체 이벤트 검색
	Page<Event> findByEventTitleContaining(String eventTitle, Pageable pageable);
	
	//관리자페이지: 현재 진행 중 이벤트 검색
	Page<Event> findByEventTitleContainingAndEventCreateAtLessThanAndEventEndAtGreaterThan(String eventTitle,
			LocalDateTime now, LocalDateTime now2, Pageable pageable);
	
	Page<Event> findByEventCreateAtLessThanAndEventEndAtGreaterThan(LocalDateTime now, LocalDateTime now2,
			Pageable pageable);
	
	//홈: 현재 진행중인 이벤트
	List<Event> findByEventCreateAtLessThanAndEventEndAtGreaterThan(LocalDateTime now, LocalDateTime now2);

	

}
