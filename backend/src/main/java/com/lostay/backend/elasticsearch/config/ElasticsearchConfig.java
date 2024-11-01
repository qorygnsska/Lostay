package com.lostay.backend.elasticsearch.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;

@Configuration
public class ElasticsearchConfig {

	@Bean//서버가 실행되면 IoC Container에 es클라이언트 builder 등록
	public ElasticsearchClient esClientBuilder() {
		System.out.println("ElasticsearchClient-built");
		
		//RestClient: Elasticsearch Server에 
		//HTTP request를 보낼 RESTful client
		
		//HttpHost: Host(Server),,, AWS에 올린다면???ㅜㅜ
		RestClient restClient = RestClient.builder(
				new HttpHost("localhost",9200,"http")).build();
		
		//RestClientTransport: 클라이언트와 서버 간의 통로
		// w/ java class <-> json mapper
		RestClientTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
		
		
		return new ElasticsearchClient(transport);
	}
	
}
