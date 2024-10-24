package com.lostay.backend.cart.service;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
@Transactional
public class CartService {

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private HotelRepository hotelRepo;

	@Autowired
	private UserRepository userRepo;

	 @PersistenceContext
	    private EntityManager entityManager;
	

	    @Autowired
	    private SessionFactory sessionFactory;
	 

	public void cartsave(Long userNo, Long hotelNo) {
		  // 사용자 찾기
	    User user = userRepo.findById(userNo).orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
	    
	    // 호텔 찾기
	    Hotel hotel = hotelRepo.findById(hotelNo).orElseThrow(() -> new RuntimeException("호텔을 찾을 수 없습니다."));  
	    
	    // 새로운 Cart 생성
	    Cart cart = new Cart();
	    cart.setUser(user); // 사용자 설정

	    // 호텔을 카트에 추가
	    cart.getHotels().add(hotel); // 카트에 호텔을 추가합니다.
	    
	    // 카트 저장
	    cartRepo.save(cart);
	}

	//내가 선택한 호텔찜 삭제

	public void deleteById(Long cartNo) {
		log.info("CartService deleteById 실행");
		  // 카트 조회: 존재하지 않으면 예외 발생
        Cart cart = cartRepo.findById(cartNo)
            .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        // Cart 삭제
        cartRepo.delete(cart); // 해당 카트만 삭제

	}
}
