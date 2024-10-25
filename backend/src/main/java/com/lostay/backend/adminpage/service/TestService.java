package com.lostay.backend.adminpage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.event.repository.EventRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class TestService {

	@Autowired
	EventRepository eventRepo;
	
	
	
	
	
}
