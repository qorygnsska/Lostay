package com.lostay.backend.main.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.location.dto.LocationDTO;
import com.lostay.backend.location.entity.Location;
import com.lostay.backend.location.repository.LocationRepository;

@Service
public class MainService {

	@Autowired
	private HotelRepository hotelRepo;
	@Autowired
	private LocationRepository locationRepo;
	
	public List<HotelDTO> hotels() {
		
	
		return null;
	}

	public List<LocationDTO> findAll() {
		List<Location> locationentity= locationRepo.findAll();
		List<LocationDTO>locationDTOList= new ArrayList<LocationDTO>();
		for(Location location:locationentity) {
			LocationDTO dto= new LocationDTO();
			dto.setLocationImage(location.getLocationImage());
			dto.setLocationName(location.getLocationName());
			dto.setLocationNo(location.getLocationNo());
			locationDTOList.add(dto);
		}
		return locationDTOList ;
	}

}
