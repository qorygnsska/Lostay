package com.lostay.backend.cart.service;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lostay.backend.cart.dto.CartDTO;
import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.cart.repository.CartRepository;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.hotel.repository.HotelRepository;
import com.lostay.backend.user.entity.User;
import com.lostay.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CartService {

    @Autowired
    private CartRepository cartRepo;
    
    @Autowired
    private HotelRepository hotelRepo;
    
    @Autowired
    private UserRepository userRepo;

    @Transactional
    public Cart cartsave(Long userNo, Long hotelNo) {
    
    	  // 사용자와 호텔 엔티티를 가져옵니다.
        User user = userRepo.findById(userNo)
                                  .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        Hotel hotel = hotelRepo.findById(hotelNo)
                                     .orElseThrow(() -> new RuntimeException("호텔을 찾을 수 없습니다."));

        // 새 카트 인스턴스를 생성합니다.
        Cart cart = new Cart();
        cart.setUser(user);
        cart.getHotels().add(hotel); // 카트에 호텔을 추가합니다.

        // 카트를 저장합니다 (CascadeType.ALL 덕분에 관계도 자동으로 처리됩니다).
        return cartRepo.save(cart);
    
    
    }
}
