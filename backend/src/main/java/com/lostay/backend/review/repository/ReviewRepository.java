package com.lostay.backend.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostay.backend.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
