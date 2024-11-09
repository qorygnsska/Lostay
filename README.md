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

<br><br><br>
# :dart: 메인 기능

### 길찾기
  - Kakao + TMap API 이용한 길찾기
  - 자동차 + 도보 + 대중교통 선택 가능

* * *
<img src="https://github.com/user-attachments/assets/cd1a1bd8-49be-4b75-a2d4-cfeae3bf6720" width="450" height="550"/>

* * *
<br><br>
  
### 검색
  - Elasticesearch norl 분석기 사용
  - 검색 필터 기능

* * *
<img src="https://github.com/user-attachments/assets/3002e538-8f8f-4e23-a34f-9cfeb62a3638" width="450" height="550"/>

* * *
<br><br>

### 로그인
  - JWT + Oauth2 사용한 소셜 로그인
  - 회원가입 / 로그인 통합
  - coolSms API 이용한 휴대폰 번호 인증...

    
* * *
<img src="https://github.com/user-attachments/assets/1e19b93b-33b2-41c7-bdac-d7ae9944b659" width="450" height="550"/>

* * *
<br><br>
 
### 결제
  - 사전 검증, 사후 검증, 환불 기능
  - PortOne API 사용
  - Synchronized을 이용한 중복 예약 방지

* * *
<img src="https://github.com/user-attachments/assets/fa3ea8bc-2616-431b-9b5b-ea9bb439f143" width="450" height="550"/>

* * *
<br><br><br>


# :gun: 트러블 슈팅

### 이미지 최적화
    웹사이트에서 크롤링을 진행한 결과, 이미지 파일 용량이 전체적으로 30GB 이상에 달했습니다.  
    이미지 용량이 크면 로딩 속도가 느려져 사용자 경험에 악영향을 미칠 수 있다고 생각했습니다.  
    페이지 로딩이 늦어지면 사용자가 이탈할 확률이 높아지기 때문입니다.  

    이 문제를 해결하기 위해 구글에서 개발한 Webp 포맷으로 이미지를 최적화했습니다.  
    Webp는 JPEG나 PNG보다 압축률이 우수하고, 같은 품질을 유지하면서 파일 크기를 크게 줄일 수 있는 장점이 있습니다.  
    특히, WebP 포맷은 웹 환경에서 성능 최적화에 유리해 많은 웹사이트에서 사용되고 있습니다.

    최적화 과정에서 품질 80%로 설정하여 눈에 띄지 않는 품질 저하를 방지하면서 용량을 효과적으로 줄였습니다.  
    그 결과, 전체 이미지 용량이 30GB 이상에서 약 6GB로 감소하게 되었습니다.  
    이는 약 80% 이상의 용량 절감을 이루었습니다.
<br><br>

### Elasticesearch

<br><br>
### Synchronized


<br><br><br>

# :receipt: Reference
- 디자인은 여기어때, 야놀자 사이트를 참고하여 만들었으며 현 사이트는 상업적 목적으로 사용하지 않습니다.
