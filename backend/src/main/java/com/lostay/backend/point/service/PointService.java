package com.lostay.backend.point.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.point.dto.PointDTO;
import com.lostay.backend.point.entity.Point;
import com.lostay.backend.point.repository.PointRepository;

@Service
public class PointService {

	@Autowired
	private PointRepository pointRepo;
	
	public List<PointDTO> pointList(Long userNo) {
		 
		 List<Point> results = pointRepo.findByUserNoWithPoints(userNo);
		    List<PointDTO> PointDTOList=new ArrayList<PointDTO>();
		   
		    for (Point result : results) {
		    	PointDTO dto= new PointDTO();
		    	dto.setUserAllPoint(result.getPointTitle());
		    	
		        }
		return PointDTOList;
		
		
	
	}

}
