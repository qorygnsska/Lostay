package com.lostay.backend.discount.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Discount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dis_no")
	private Long disNo;			// 할인넘버
	@Column(name = "dis_category")
	private String disCategory;	// 결제유형
	@Column(name = "dis_rate")
	private double disRate;		// 할인율(pay에 관한 할인)
	@Column(name = "dis_image")
	private String disImage;
	@Column(name = "dis_pg")
	private String disPg;
}
