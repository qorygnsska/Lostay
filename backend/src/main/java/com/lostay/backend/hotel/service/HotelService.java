package com.lostay.backend.hotel.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lostay.backend.hotel.dto.HotelDTO;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;

@Service
public class HotelService {

	  @PersistenceContext
	    private EntityManager entityManager;

	  public List<Hotel> findByAmenitiesAndAddress(String[] amenities, String hotelAddress) {
		  StringBuilder queryBuilder = new StringBuilder("SELECT h FROM Hotel h WHERE h.hotelAdress LIKE :hotelAddress");
		    
		    // 호텔 주소 파라미터 설정
		    queryBuilder.append(" AND h.hotelAdress LIKE :hotelAddress");

		    // 어메니티가 있을 경우 조건 추가
		    if (amenities.length > 0 && !amenities[0].isEmpty()) {
		        for (int i = 0; i < amenities.length; i++) {
		            queryBuilder.append(" AND FIND_IN_SET(:amenity" + i + ", h.hotelAmenities) > 0");
		        }
		    }

		    String queryString = queryBuilder.toString();
		    System.out.println("Generated Query: " + queryString);

		    TypedQuery<Hotel> query = entityManager.createQuery(queryString, Hotel.class);
		    
		    // 호텔 주소 파라미터 설정
		    query.setParameter("hotelAddress", "%" + hotelAddress + "%");

		    // 어메니티 파라미터 설정
		    if (amenities.length > 0 && !amenities[0].isEmpty()) {
		        for (int i = 0; i < amenities.length; i++) {
		            query.setParameter("amenity" + i, amenities[i]);
		        }
		    }

		    List<Hotel> resultList = query.getResultList();
		    System.out.println("Number of results: " + resultList.size());
		    for (Hotel hotel : resultList) {
		        System.out.println("Hotel Name: " + hotel.getHotelName());
		        System.out.println("Hotel Address: " + hotel.getHotelAdress());
		    }

		    return resultList;
	    }
}
