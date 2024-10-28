package com.lostay.backend.sms.service;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lostay.backend.sms.util.SmsUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SmsService {

	@Autowired
	private final SmsUtil smsUtil;
	
	public Object sendSms(String phoneNum) {
		phoneNum = phoneNum.replace("-", "");
        String certificationCode = Integer.toString((int)(Math.random() * (999999 - 100000 + 1)) + 100000); // 6자리 인증 코드를 랜덤으로 생성
        smsUtil.sendOne(phoneNum, certificationCode); // SMS 인증 유틸리티를 사용하여 SMS 발송
        
        Map<String, String> numMap = new HashMap<>();
        numMap.put("certificationCode", certificationCode);
        
        return numMap;
	}
}
