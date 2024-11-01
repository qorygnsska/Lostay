package com.lostay.backend.elasticsearch.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.ElasticsearchException;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;

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

	public List<String> search(String searchVal) {

		//서버주소/Index명/_search
		//GET http://localhost:9200/kibana_sample_data_ecommerce/_search
		
		//HTTP Response로 돌려줄 결과물
		List<String> resultList= new ArrayList<String>();
		
		//Elasticsearch에 요청하여 받을 response
		SearchResponse<Map> response;
		try {
			response = esc.search(s -> s
									.index("kibana_sample_data_ecommerce")
									.query(q -> q
										.wildcard(w -> w
											.field("customer_full_name")
											.value(searchVal)
												)
									),
									Map.class);
			
			List<Hit<Map>> hits = response.hits().hits();
			
			for (Hit<Map> hit : hits) {
				Map<String, Object> source = hit.source();
				System.out.println("KeySet: " + source.keySet().toString());
				resultList.add(source.toString());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			resultList.add("catchError");
		}
		
		return resultList;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
