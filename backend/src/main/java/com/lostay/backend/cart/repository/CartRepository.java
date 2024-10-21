package com.lostay.backend.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.cart.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
