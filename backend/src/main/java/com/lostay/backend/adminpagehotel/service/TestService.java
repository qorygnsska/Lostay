package com.lostay.backend.adminpagehotel.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.adminpagehotel.dto.HotelInfosDTO;
import com.lostay.backend.adminpagehotel.dto.roomsDTO;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.room.entity.Room;
import com.lostay.backend.room.repository.RoomRepository;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class TestService {
    @Autowired 
    private HotelRepository hotelRepo;
    
    @Autowired
    private RoomRepository roomRepo;
    
    public Page<HotelInfosDTO> getHotels(int pageIndex) {
        Pageable pageable = PageRequest.of(pageIndex, 10, Sort.by("hotelNo").ascending());
        Page<HotelInfosDTO> hotelsDTOPage = hotelRepo.findBYHotelsInfo(pageable);
        
        // 모든 호텔을 가져옴
        List<Hotel> allHotels = hotelRepo.findAll(); 

        // 각 호텔 DTO에 방 리스트 설정
        for (HotelInfosDTO dto : hotelsDTOPage.getContent()) {
            List<roomsDTO> roomsList = new ArrayList<>(); // 호텔마다 새로운 리스트 생성

            // 모든 호텔에서 해당 호텔의 방 정보를 가져옴
            for (Hotel hotel : allHotels) {
                if (hotel.getHotelNo().equals(dto.getHotelNo())) {
                    for (Room room : hotel.getRooms()) {
                        roomsDTO roomsdto = new roomsDTO();
                        roomsdto.setRoomNo(room.getRoomNo()); 
                        roomsdto.setRoomName(room.getRoomName()); 
                        roomsdto.setRoomCount(room.getRoomCount()); 
                        roomsdto.setRoomPrice(room.getRoomPrice()); 
                        roomsdto.setRoomDiscount(room.getRoomDiscount()); 
                        roomsList.add(roomsdto); // 방 정보를 리스트에 추가
                    }
                }
            }

            dto.setRooms(roomsList); // 각 호텔 DTO에 방 리스트 설정
        }

        return hotelsDTOPage; // Page<HotelInfosDTO> 반환
    }
     
}





