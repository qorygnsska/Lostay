package com.lostay.backend.discount.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Discount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long dis_no;			// 할인넘버
	
	private String dis_category;	// 결제유형
	private double dis_rate;		// 할인율(pay에 관한 할인)
}
