package com.lostay.backend.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRoomsDTO {
    private Long roomNo;      // 객실 번호
    private String roomName;  // 객실 이름
}
