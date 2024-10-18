package com.lostay.backend.location.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.room.entity.Room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "location_no")
	private Long locationNo;
	@Column(name = "location_name")
	private String locationName;
	@Column(name = "location_image")
	private String locationImage;
}
