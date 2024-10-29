package com.lostay.backend.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentVerificationDTO {

	private String imp_uid;  // 결제 고유 ID
	 private String merchant_uid;  // 결제 주문 번호
	private String amount;   // 결제 금액
	
    @Builder
    public PaymentVerificationDTO(String imp_uid) {
        this.imp_uid = imp_uid;
    }
}
