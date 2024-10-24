package com.lostay.backend.payment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lostay.backend.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

	
}
