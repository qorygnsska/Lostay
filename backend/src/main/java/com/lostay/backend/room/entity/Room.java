package com.lostay.backend.room.entity;

import java.util.Objects;
import java.time.LocalTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lostay.backend.hotel.entity.Hotel;
import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.review.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Room {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="room_no")
	private Long roomNo;   					// 객실넘버	
	
	@JoinColumn(name = "hotelNo", nullable = false)
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonBackReference // Room에서 Hotel 방향
	private Hotel hotel;					// 호텔넘버 외래키
	@Column(name="room_name")
	private String roomName;					// 객실명
	@Column(name="room_people_max")
	private int roomPeopleMax;				// 객실인원(최대수) - 검색 시
	@Column(name="room_people_info")
	private String roomPeopleInfo;			// 객실인원(기준) - 문자열로 기준인원/최대인원 보여줄 시
	@Column(name="room_count")
	private int roomCount;						// 객실 수
	@Column(name="room_thumbnail")
	private String roomThumbnail;				// 객실썸네일
	
	@Lob
	@Column(name="room_img")
	private String roomImg;					// 객실이미지
	@Column(name="room_price")
	private int roomPrice;						// 객실가격
	@Column(name="room_discount")
	private int roomDiscount;					// 객실할인율
	@Column(name="room_amenities")
	private String roomAmenities;				// 객실편의시설
	@Column(name="room_introduction")
	private String roomIntroduction;			// 객실소개(정보)
	@Column(name="room_checkin_time")
	private LocalTime roomCheckinTime;	// 객실체크인시간
	@Column(name="room_checkout_time")
	private LocalTime roomCheckoutTime;	// 객실체크아웃시간
	
	@OneToOne(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // room 엔티티와의 관계 설정
	@ToString.Exclude  // 순환 참조 방지
	private Payment payments; // 예약 목록
	
	@OneToMany(mappedBy = "room",cascade = CascadeType.ALL, fetch = FetchType.LAZY ) // room 엔티티와의 관계 설정
	@ToString.Exclude  // 순환 참조 방지
	@JsonIgnore // Review에서 Room 방향
	private Set<Review> reviews; // 리뷰 목록
	
	// equals 및 hashCode 메소드 추가
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return roomNo != null && roomNo.equals(room.roomNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomNo);
    }
	
}
