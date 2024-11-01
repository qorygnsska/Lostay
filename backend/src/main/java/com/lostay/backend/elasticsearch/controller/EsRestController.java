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
		
	@GetMapping("/searchIndex")
	public ResponseEntity<?> searchIndex(@RequestParam String searchVal) {
		
		System.out.println("esController.searchIndex: " + searchVal);
		
		return new ResponseEntity<>(ess.searchIndex(searchVal), HttpStatus.OK);
	}
	
	
	@GetMapping("/searchToken")
	public ResponseEntity<?> searchToken(@RequestParam String searchVal) {
		System.out.println("esController.searchToken: " + searchVal);
		
		return new ResponseEntity<>(ess.searchToken(searchVal), HttpStatus.OK);
	}
	
	
	
	
}
