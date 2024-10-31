package com.lostay.backend.elasticsearch.service;

import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;

@Service
public class EsService {

	//https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/8.15/getting-started-java.html#_installation_in_a_maven_project_by_using_jackson
	
	@Autowired // ElasticsearchConfig에서 만들어준 클라이언트
	private ElasticsearchClient esc;

	@PostConstruct
	// 강사님 comment!
	// - 객체의 생성과 의존성주입이 완료된 후 실행ㅎ야 하는 초기화 메서드들을 정의할 때 사용한다. 메서드가 실행하는 시점
	// - spring 컨테이너에서 해당 객체의 생성자 호출 및 의존성 주입이 끝난 후 자동으로 실행된다.
	// @PostConstruct 제약조건
	// - 매개변수가 없어야된다.
	// - 반환하는 타입이 void
	// - public
	public void checkingConnection() { //Elasticsearch Server와 Client간 커넥션 체크
		try {
			boolean isConnected = esc.ping().value();
			//ping() : 서버의 동작(연결) 상태 확인
			if(isConnected) {
				System.out.println("ElasticsearchClient-Server-Connected");
			}else {
				System.out.println("ElasticsearchClient-Server-Misconnected");
				esc._transport().close();
			}
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("ElasticsearchServer-Not-Found");
		}
	}

	public Map<String, Object> getDocument(String searchVal) {


		
		return null;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
