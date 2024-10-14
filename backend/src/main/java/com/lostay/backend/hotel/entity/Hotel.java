package com.lostay.backend.hotel.entity;

import java.util.Set;

import javax.persistence.*;

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
	private Long hotelNo;				// 호텔넘버
	
	private String hotelName;			// 호텔명
	private String hotelThumbnail;  	// 호텔썸네일
	@Lob
	private String hotelImage;			// 호텔이미지
	private String hotelAmenities;     // 호텔서비스/시설
	private String hotelRating;		// 호텔등급
	private String hotelAdress;		// 호텔주소
	private String hotelTouristAttraction;	// 호텔관광명소
	@Lob
	private String hotelIntroduction;			// 호텔소개

	@ManyToMany(mappedBy = "hotels") // Cart 엔티티와의 관계 설정
    private Set<Cart> carts;           // 카트 목록
	
	@OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY) // Room 엔티티와의 관계 설정
	@ToString.Exclude
	private Set<Room> rooms; // 카트 목록
	
}
