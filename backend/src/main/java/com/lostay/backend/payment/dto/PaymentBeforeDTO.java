package com.lostay.backend.payment.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentBeforeDTO {
	private int point;
	private Long roomNo;
    private Long disNo;
    private String merchant_uid;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
}
