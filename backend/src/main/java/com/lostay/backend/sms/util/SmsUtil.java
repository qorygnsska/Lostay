package com.lostay.backend.sms.util;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Component
public class SmsUtil {

    @Value("${coolsms.api.key}")
    private String apiKey;
    @Value("${coolsms.api.secret}")
    private String apiSecretKey;
    @Value("${coolsms.fromnumber}") // 발신자 번호 주입
    private String fromNumber;
    
    private DefaultMessageService messageService;

    @PostConstruct
    private void init(){
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
    }
	
    // 단일 메시지 발송 예제
    public void sendOne(String to, String verificationCode) {
        Message message = new Message();
        message.setFrom(fromNumber);
        message.setTo(to);
        message.setText("[로스테이] 아래의 인증번호를 입력해주세요\n" + verificationCode);

        this.messageService.sendOne(new SingleMessageSendingRequest(message));
    }
    
}
