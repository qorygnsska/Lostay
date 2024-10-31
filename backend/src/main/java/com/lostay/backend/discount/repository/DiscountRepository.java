package com.lostay.backend.discount.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.discount.entity.Discount;

public interface DiscountRepository extends JpaRepository<Discount, Long> {

}
