package com.lostay.backend.hotel.entity;

import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lostay.backend.cart.entity.Cart;
import com.lostay.backend.room.entity.Room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Hotel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hotel_no")
	private Long hotelNo;				// 호텔넘버
	@Column(name = "hotel_name")
	private String hotelName;			// 호텔명
	@Column(name = "hotel_thumbnail")
	private String hotelThumbnail;  	// 호텔썸네일
	@Lob
	@Column(name = "hotel_image")
	private String hotelImage;			// 호텔이미지
	@Column(name = "hotel_amenities")
	private String hotelAmenities;     // 호텔서비스/시설
	@Column(name = "hotel_rating")
	private String hotelRating;		// 호텔등급
	@Column(name = "hotel_adress")
	private String hotelAdress;		// 호텔주소
	@Column(name = "hotel_tourist_attraction")
	private String hotelTouristAttraction;	// 호텔관광명소
	@Lob
	@Column(name = "hotel_introduction")
	private String hotelIntroduction;			// 호텔소개

	@ManyToMany(mappedBy = "hotels", fetch = FetchType.LAZY) // Cart 엔티티와의 관계 설정
	@ToString.Exclude
	@JsonBackReference // Cart에서 Hotel 방향
    private Set<Cart> carts;           // 카트 목록
	
	@OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY,cascade = CascadeType.ALL) // Room 엔티티와의 관계 설정
	@ToString.Exclude
	@JsonIgnore // Room에서 Hotel 방향
	private Set<Room> rooms; // 룸 목록
	
}
