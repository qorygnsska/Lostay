package com.lostay.backend.adminpage.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelInfosDTO {

	private Long hotelNo; // 호텔넘버
	private String hotelName; // 호텔명
	private String hotelRating; // 호텔등급
	private String hotelAdress; // 호텔주소
	private int hotelCommission; // 호텔 중개료
	private String hotelAmenities;
	private String hotelImage;
	private String hotelIntroduction;
	private String hotelTouristAttraction;
	private String hotelThumbnail;
	private List<String> hotelImageList;
	private List<String> hotelAmenitiesList;
	private List<roomsDTO> rooms; // 객실 정보 리스트
	private List<String> hotelTouristAttractionList;

	public HotelInfosDTO(Long hotelNo, String hotelName, String hotelRating, String hotelAdress, int hotelCommission,
			String hotelAmenities, String hotelImage, String hotelIntroduction, String hotelTouristAttraction,
			String hotelThumbnail) {
		this.hotelNo = hotelNo;
		this.hotelName = hotelName;
		this.hotelRating = hotelRating;
		this.hotelAdress = hotelAdress;
		this.hotelCommission = hotelCommission;
		this.hotelAmenities = hotelAmenities;
		this.hotelImage = hotelImage;
		this.hotelIntroduction = hotelIntroduction;
		this.hotelTouristAttraction = hotelTouristAttraction;
		this.hotelThumbnail = hotelThumbnail;
	}
//    public HotelInfosDTO(Long hotelNo, String hotelName, String hotelRating, String hotelAdress, int hotelCommission,
//			Long totalRoomCount) {
//		super();
//		this.hotelNo = hotelNo;
//		this.hotelName = hotelName;
//		this.hotelRating = hotelRating;
//		this.hotelAdress = hotelAdress;
//		this.hotelCommission = hotelCommission;
//		this.totalRoomCount = totalRoomCount;
//	}

}
