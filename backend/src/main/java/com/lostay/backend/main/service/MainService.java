package com.lostay.backend.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.repository.HotelRepository;

@Service
public class MainService {

	@Autowired
	private HotelRepository hotelRepo;
	
	public List<HotelDTO> hotels() {
		
	
		return null;
	}

}
