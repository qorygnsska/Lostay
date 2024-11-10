# :interrobang: 프로젝트 소개
교통 데이터를 활용한 호텔 예약 사이트
<br><br><br>


# :date: 프로젝트 기간
~2024.11.08
<br><br><br>


# :busts_in_silhouette: 팀원 구성 및 역할
### FrontEnd + BackEnd
  - 박정일
  - 안효준
  - 배교훈

### BackEnd
  - 홍정훈
  - 심재호
<br><br><br>


# :seedling: 개발 환경
### FrontEnd
- React, React-Router, Redux, CRA


### Backend
- Java11, SpringBoot, Spring Security, JPA, MySql 8.0, Redis


### 협업 Tool
- Github

### ETC
- Kakao Mobility API, Kakao Map API, TMap API, Elasticesearch API, ProtOne API, coolSms API, OAuth2(Google, Kakao, Naver)
<br><br><br>

# :bar_chart: ERD

<img src="https://github.com/user-attachments/assets/bbf3b0bb-6ab3-48e5-90a5-8f22ae4fe6ed" width="100%" height="600"/>

<br><br><br>
# :dart: 메인 기능

### 길찾기
  - Kakao + TMap API 이용한 길찾기
  - 자동차 + 도보 + 대중교통 선택 가능
  - 자동차 교통 혼잡도 폴리라인으로 표시

* * *
<img src="https://github.com/user-attachments/assets/cd1a1bd8-49be-4b75-a2d4-cfeae3bf6720" width="450" height="550"/>

* * *
<br><br>
  
### 검색
  - 검색의 정확성과 단어 정제를 위한 Elasticesearch norl 분석기 사용
  - 사용자 유연한 검색 제공
  - 검색 필터 기능

* * *
<img src="https://github.com/user-attachments/assets/3002e538-8f8f-4e23-a34f-9cfeb62a3638" width="450" height="550"/>

* * *
<br><br>

### 로그인
  - JWT + Oauth2 사용한 소셜 로그인
  - coolSms API 이용한 휴대폰 번호 인증

    
* * *
<img src="https://github.com/user-attachments/assets/1e19b93b-33b2-41c7-bdac-d7ae9944b659" width="450" height="550"/>

* * *
<br><br>
 
### 결제
  - 사전 검증, 사후 검증 단계를 거쳐 신뢰성과 무결성 확보
  - PortOne API 사용
  - Synchronize, Redis 사용하여 동시성 해결

* * *
<img src="https://github.com/user-attachments/assets/fa3ea8bc-2616-431b-9b5b-ea9bb439f143" width="450" height="550"/>

* * *
<br><br><br>


# :gun: 트러블 슈팅

### 이미지 최적화
    웹사이트에서 크롤링을 진행한 결과, 이미지 파일 용량이 전체적으로 30GB 이상에 달했다.  
    이미지 용량이 크면 로딩 속도가 느려져 사용자 경험에 악영향을 미칠 수 있다고 생각했다.
    페이지 로딩이 늦어지면 사용자가 이탈할 확률이 높아지기 때문이다.  

    이 문제를 해결하기 위해 구글에서 개발한 Webp 포맷으로 이미지를 최적화했다.
    Webp는 JPEG나 PNG보다 압축률이 우수하고, 같은 품질을 유지하면서 파일 크기를 크게 줄일 수 있는 장점이 있다.
    특히, WebP 포맷은 웹 환경에서 성능 최적화에 유리해 많은 웹사이트에서 사용되고 있다.

    최적화 과정에서 품질 80%로 설정하여 눈에 띄지 않는 품질 저하를 방지하면서 용량을 효과적으로 줄였다.
    그 결과, 전체 이미지 용량이 30GB 이상에서 약 6GB로 감소하게 되었다.
    이는 약 80% 이상의 용량 절감을 이루었다.
<br><br>

### Elasticesearch

<br><br>

### 길찾기

<br><br>

### 동시성
    객실이 1개 남았을 때, 2명이 예약하기 버튼을 누르면 동시에 결제페이지로 이동하게 되어
    1개 남은 객실에 중복결제가 발생하는 상황이 발생했다.

    이 문제를 해결하기 위해 Synchronize로 동시성을 처리했다.
    또한, 객실 결제 대기중인 사람의 카운트와 15분의 TTL을 설정 후 Redis에 저장했다.
    결제 대기 카운트와 DB에 결제된 카운트를 차감하여 0이면 예약하기 버튼을 비활성화하여 해결했다.
    

    

<br><br><br>

# :receipt: Reference
- 디자인은 여기어때, 야놀자 사이트를 참고하여 만들었으며 현 사이트는 상업적 목적으로 사용하지 않습니다.
