package com.lostay.backend.adminpagehotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.adminpage.controller.AdminController;
import com.lostay.backend.adminpagehotel.dto.HotelInfosDTO;
import com.lostay.backend.hotel.repository.HotelRepository;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
public class TestService {
	@Autowired 
	private HotelRepository hotelRepo;
	
	
	public Object getHotels(int pageIndex) {
		
		Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("hotelNo").descending());
		
		List<HotelInfosDTO> hotelsDTO=hotelRepo.findBYHotelsInfo(pageable);
		
		return hotelsDTO;
	}

}
