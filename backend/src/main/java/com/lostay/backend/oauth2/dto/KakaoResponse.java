package com.lostay.backend.oauth2.dto;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {

	private final Map<String, Object> attribute;
	private final Map<String, Object> profileAttribute;
	private final Map<String, Object> kakakoAccount;

	public KakaoResponse(Map<String, Object> attribute) {
		this.attribute = attribute;
		this.profileAttribute = (Map<String, Object>) attribute.get("properties");
		this.kakakoAccount = (Map<String, Object>) attribute.get("kakao_account");
	}

	@Override
	public String getProvider() {
		
		return "kakao";
	}

    @Override
    public String getProviderId() {

        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {

        return kakakoAccount.get("email").toString();
    }

    @Override
    public String getName() {
    	System.out.println("뜨니"+profileAttribute.get("nickname").toString());
        return profileAttribute.get("nickname").toString();
    }
}

