package com.lostay.backend.payment.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.Parameter;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lostay.backend.oauth2.service.CustomOAuth2User;
import com.lostay.backend.payment.dto.PaymentBeforeDTO;
import com.lostay.backend.payment.dto.PaymentDTO;
import com.lostay.backend.payment.dto.PaymentVerificationDTO;
//import com.lostay.backend.payment.entity.Payment;
import com.lostay.backend.payment.repository.PaymentRepository;
import com.lostay.backend.payment.service.PaymentService;
import com.lostay.backend.reservation.service.ReservationService;
import com.lostay.backend.room.service.RoomService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

	private IamportClient iamportClient;

    @Value("${imp.api.key}")
    private String apiKey;
    
    @Value("${imp.api.secretKey}")
    private String secretKey;
	
	
	@Autowired
	private PaymentService paySer;
	
	@Autowired
	private RoomService roomSer;
	

	// 결제 내역
	@GetMapping("/History")//변경전: PaymentHistory 변경후:/payment/History
	public ResponseEntity<?> paymenthistory(@RequestParam(defaultValue = "3") Long payNo){

		
		return new ResponseEntity<>(paySer.findPayHistory(payNo),HttpStatus.OK);
	}
	
	
	// 결제 진행 페이지 호텔-객실(투숙) 정보 <결제정보에서 상품금액에서도 사용>
	@GetMapping("/HotelRoomInfo")//변경전: HotelRoomInfo 변경후:/payment/HotelRoomInfo
	public ResponseEntity<?> hotelroominfo(@AuthenticationPrincipal CustomOAuth2User customOAuth2User
										  ,@RequestParam(defaultValue = "6") Long roomNo
										  ,@RequestParam(defaultValue = "2024-12-03") 
    									   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate
    									  ,@RequestParam(defaultValue = "2024-12-05") 
										   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate){
			
		
		
		return new ResponseEntity<>(paySer.findRoomInfo(roomNo,checkInDate,checkOutDate),HttpStatus.OK);
			
	}
	
	
	// 결제 진행 페이지 유저 정보 <결제정보에서 보유 포인트에서도 사용>
		@GetMapping("/UserInfo")//변경전: UserInfo 변경후:/payment/UserInfo
		public ResponseEntity<?> userinfo(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){
				
			Long userNo = customOAuth2User.getUserNo();
			
			return new ResponseEntity<>(paySer.findUserInfo(userNo),HttpStatus.OK);
				
		}
	
	
		
	// 사전검증
	@PostMapping("/Before")//변경전: /Payment/Before 변경후:/payment/Before
	private ResponseEntity<?> paymentbefore(@AuthenticationPrincipal CustomOAuth2User customOAuth2User
			                               ,@RequestBody PaymentBeforeDTO paymentBeforeDTO){

		Long count = paySer.findAvailableCount(paymentBeforeDTO);
		if(count <= 0) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	
		System.out.println("before 데이터 보기" + paymentBeforeDTO.toString());
		try {
			 long userNo = customOAuth2User.getUserNo();
				
			 int amount = paySer.compareAmount(userNo,paymentBeforeDTO.getPoint(),paymentBeforeDTO.getRoomNo(),paymentBeforeDTO.getDisNo());
		
			 if(amount < 0) {
				 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			 }
			
			 HttpRequest request = HttpRequest.newBuilder()
					    .uri(URI.create("https://api.iamport.kr/users/getToken"))
					    .header("Content-Type", "application/json")
					    .method("POST", HttpRequest.BodyPublishers.ofString(String.format("{\"imp_key\":\"%s\",\"imp_secret\":\"%s\"}", apiKey, secretKey)))
					    .build();
			
			 HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
			 
			 if(response.statusCode() != 200) {
				 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			 }else {
				 System.out.println("토큰 발급 성공");
			 }
			 
			 JSONObject jsonResponse = new JSONObject(response.body());
			 
			 // jsonObject에서 response 안에 있는 access토큰 문자열로 받아오기
			 String accessToken = jsonResponse.getJSONObject("response").getString("access_token");
			 System.out.println("accessToken" + accessToken);
			 // 사전검증 api
			 HttpRequest request2 = HttpRequest.newBuilder()
					 .uri(URI.create("https://api.iamport.kr/payments/prepare"))
					 .header("Content-Type", "application/json")
					 .header("Authorization", "Bearer " + accessToken)
					 .method("POST", HttpRequest.BodyPublishers.ofString(String.format("{\"merchant_uid\":\"%s\",\"amount\":%d}", paymentBeforeDTO.getMerchant_uid(), amount)))
					 .build();
			 HttpResponse<String> response2 = HttpClient.newHttpClient().send(request2, HttpResponse.BodyHandlers.ofString());

			 JSONObject jsonResponse2 = new JSONObject(response2.body());
			 
			 System.out.println(response2.statusCode());
			 if(response2.statusCode() != 200) {
				 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			 }
			 return new ResponseEntity<>(HttpStatus.OK);
			 
		} catch (JSONException e) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body("JSON 파싱 오류: " + e.getMessage());
	                
	        } catch (IOException | InterruptedException e) {
	            return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("API 호출 중 오류 발생: " + e.getMessage());
	        }
	
	}
		
		
	// 사후검증	
	@PostMapping("/Verification")//변경전: /Payment/Verification 변경후:/payment/Verification
	  private IamportResponse<Payment> paymentByImpUid(@RequestBody PaymentVerificationDTO payDTO) throws IamportResponseException,IOException {
		 iamportClient = new IamportClient(apiKey, secretKey);
		 
		 System.out.println("payDTO" + payDTO);
        return iamportClient.paymentByImpUid(payDTO.getImp_uid());
    }
	
	
	// 사후검증 완료 시 결제 테이블 데이터 삽입

	@PostMapping("/Insert")//변경전: /PaymentInsert 변경후:/payment/Insert
	public ResponseEntity<?> paymentinsert(@AuthenticationPrincipal CustomOAuth2User customOAuth2User
							 ,@RequestBody PaymentDTO dto){

			Long count = paySer.findAvailableCount(dto);
			if(count <= 0) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		
			Long userNo = customOAuth2User.getUserNo();
			
			Boolean result = paySer.savePayment(userNo,dto);
			System.out.println(result);
			if(result) {
				
				paySer.deleteRedis(dto.getRid());
				return new ResponseEntity<>(HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
		}
	
	// 결제 취소
	@PostMapping("/Cancle")//변경전: /PaymentCancle 변경후:/payment/Cancle
	public ResponseEntity<?> paymentcancle(@RequestParam(defaultValue = "2") Long payNo,@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		
		
		try {
			// 토큰발급
			HttpRequest request = HttpRequest.newBuilder()
				    .uri(URI.create("https://api.iamport.kr/users/getToken"))
				    .header("Content-Type", "application/json")
				    .method("POST", HttpRequest.BodyPublishers.ofString(String.format("{\"imp_key\":\"%s\",\"imp_secret\":\"%s\"}", apiKey, secretKey)))
				    .build();
		
		 HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		 
		 if(response.statusCode() != 200) {
			 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		 }else {
			 System.out.println("토큰 발급 성공");
		 }
		 
		 
		 JSONObject jsonResponse = new JSONObject(response.body());
		 
		 // jsonObject에서 response 안에 있는 access토큰 문자열로 받아오기
		 String accessToken = jsonResponse.getJSONObject("response").getString("access_token");
		 
		 String uid = paySer.findUid(payNo);
		 
		// 취소 요청
		 HttpRequest cancel_request = HttpRequest.newBuilder()
					.uri(URI.create("https://api.iamport.kr/payments/cancel"))
					.header("Content-Type", "application/json")
					.header("Authorization", "Bearer " + accessToken)
					.method("POST", HttpRequest.BodyPublishers.ofString(String.format("{\"imp_uid\":\"%s\"}", uid))).build();
		 
		 
	     // 취소 요청 응답 확인
		 HttpResponse<String> cancelResponse = HttpClient.newHttpClient().send(cancel_request, HttpResponse.BodyHandlers.ofString());
		 
	       
	       if (cancelResponse.statusCode() != 200) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        } else {
	            System.out.println("결제 취소 성공");

	            Long userNo = customOAuth2User.getUserNo();
//	            Long userNo = 1L;
	            paySer.canclePayment(payNo,userNo);
	            return new ResponseEntity<>(HttpStatus.OK);
	            
	        }
	       
	       
	       
		} catch (IOException e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Network error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
	    } catch (InterruptedException e) {
	        Thread.currentThread().interrupt();
	        return new ResponseEntity<>("Request interrupted", HttpStatus.INTERNAL_SERVER_ERROR);
	    } catch (JSONException e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Invalid JSON format in response", HttpStatus.BAD_REQUEST);
	    } catch (RuntimeException e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
			
	
	}
	
	
	// 사후검증 틀릴 때 이용하는 메소드
		@PostMapping("/VCancle")//변경전: /PaymentCancle 변경후:/payment/Cancle
		public ResponseEntity<?> Vpaymentcancle(@RequestBody Map<String, Object> requestData, @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
			
			String imp_uid = (String) requestData.get("imp_uid");
			
			try {
				// 토큰발급
				HttpRequest request = HttpRequest.newBuilder()
					    .uri(URI.create("https://api.iamport.kr/users/getToken"))
					    .header("Content-Type", "application/json")
					    .method("POST", HttpRequest.BodyPublishers.ofString(String.format("{\"imp_key\":\"%s\",\"imp_secret\":\"%s\"}", apiKey, secretKey)))
					    .build();
			
			 HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
			 
			 if(response.statusCode() != 200) {
				 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			 }else {
				 System.out.println("토큰 발급 성공");
			 }
			 
			 
			 JSONObject jsonResponse = new JSONObject(response.body());
			 
			 // jsonObject에서 response 안에 있는 access토큰 문자열로 받아오기
			 String accessToken = jsonResponse.getJSONObject("response").getString("access_token");
			 
			
			 
			// 취소 요청
			 HttpRequest cancel_request = HttpRequest.newBuilder()
						.uri(URI.create("https://api.iamport.kr/payments/cancel"))
						.header("Content-Type", "application/json")
						.header("Authorization", "Bearer " + accessToken)
						.method("POST", HttpRequest.BodyPublishers.ofString(String.format("{\"imp_uid\":\"%s\"}", imp_uid))).build();
			 
			 
		     // 취소 요청 응답 확인
			 HttpResponse<String> cancelResponse = HttpClient.newHttpClient().send(cancel_request, HttpResponse.BodyHandlers.ofString());
			 
		       
		       if (cancelResponse.statusCode() != 200) {
		            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		        } else {
		            System.out.println("결제 취소 성공");

		            return new ResponseEntity<>(HttpStatus.OK);
		            
		        }
		       
		       
		       
			} catch (IOException e) {
		        e.printStackTrace();
		        return new ResponseEntity<>("Network error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
		    } catch (InterruptedException e) {
		        Thread.currentThread().interrupt();
		        return new ResponseEntity<>("Request interrupted", HttpStatus.INTERNAL_SERVER_ERROR);
		    } catch (JSONException e) {
		        e.printStackTrace();
		        return new ResponseEntity<>("Invalid JSON format in response", HttpStatus.BAD_REQUEST);
		    } catch (RuntimeException e) {
		        e.printStackTrace();
		        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		    }
				
		
		}
	
	
	

}