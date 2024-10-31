package com.lostay.backend.elasticsearch.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.elasticsearch.service.EsService;

@RestController
@RequestMapping("/es")
public class EsRestController {

	@Autowired
	private EsService ess;
	
	//https://www.skyer9.pe.kr/wordpress/?p=5655
	
	@GetMapping("/search")
	public ResponseEntity<?> getDocument(@RequestParam String searchVal) {
		
		System.out.println("esController.getDocumentSearch: " + searchVal);
		
		Map<String, Object> docu = ess.getDocument(searchVal);
		
		return new ResponseEntity<>(docu, HttpStatus.OK);
	}
	
	
	
	
	
	
}
