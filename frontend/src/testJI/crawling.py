import time
import requests
from bs4 import BeautifulSoup

print()
print("now i am crawling")

#호텔스닷컴

# 해당 지역의 호텔 검색
destination = "서울,한국"
sort_type=["RECOMMENDED", "PROPERTY_CLASS"]
html = requests.get("https://kr.hotels.com/Hotel-Search?destination="+destination+"&regionId=&flexibility=0_DAY&d1=&startDate=2024-11-13&d2=&endDate=2024-11-14&adults=2&rooms=1&theme=&userIntent=&semdtl=&useRewards=false&sort=RECOMMENDED")

#print(f'html: {html}' )
#print(f'content: {html.content}')
# content : 원본(바이트)를 그대로 가져옴, binary data(이미지, 파일 등) 다룰 때 유용

#print(f'text: {html.text}')
# text : 모든 내용을 문자열로 반환
# html.text.replace('_ or / or \', ',') : 특정 문자 가공
# print(html.text[:100]) : 슬라이싱


# time.sleep(2) # 처리 지연시간 동안 실행을 잠시 멈춤

# BeautifulSoup
#  크롤링을 하기 쉽게 도와주는 라이브러리
#  웹 페이지의 데이터를 추출 위해 html이나
#   xml문서를 파싱하여 구조화된 데이터를
#   만들 수있다. 
soup = BeautifulSoup(html.text, 'html.parser')
#print(f'soup: {soup}')

title = soup.title
print(f'타이틀: {title}')


# soup.find_all() : 모든 요소를 가져오기

# find(태그) 메서드는 Tag객체로 반환되고,
# find_all(태그) 메서드는 Tag객체 리스트로 반환된다.
# 만약 비어있다면 빈 리스트 반환된다. 

# 비어있는 값을 확인할 때는 비었는지 확인하는 not,
# len()으로 간단히 비교할 수 있다.

# .get('href') : href 속성의 값 반환(href="~~~~")
# .text : text를 읽어옴(함수가 아님)
# .get_text(strip=True) : 요소의 텍스트 반환(양쪽 공백 제거)



# 지역 검색 결과 호텔리스트 링크
# <a rel="noopener" data-stid="open-hotel-information" dd-action-name="open-hotel-information" target="_blank" id="listing-content-entry" href="/ho447673/jw-melieoteu-dongdaemun-seukweeo-seoul-seoul-hangug/?chkin=2024-10-13&amp;chkout=2024-10-15&amp;x_pwa=1&amp;rfrr=HSR&amp;pwa_ts=1728480188690&amp;referrerUrl=aHR0cHM6Ly9rci5ob3RlbHMuY29tL0hvdGVsLVNlYXJjaA%3D%3D&amp;useRewards=true&amp;rm1=a2&amp;regionId=3124&amp;destination=%EC%84%9C%EC%9A%B8%2C+%ED%95%9C%EA%B5%AD&amp;destType=MARKET&amp;neighborhoodId=553248635976382905&amp;latLong=37.566535%2C126.977969&amp;sort=RECOMMENDED&amp;top_dp=515000&amp;top_cur=KRW&amp;userIntent=&amp;selectedRoomType=200583280&amp;selectedRatePlan=211146888&amp;expediaPropertyId=7228890&amp;searchId=5ecd396a-ec8e-469a-9c44-e8ce342242dc&amp;propertyName=JW+%EB%A9%94%EB%A6%AC%EC%96%B4%ED%8A%B8+%EB%8F%99%EB%8C%80%EB%AC%B8+%EC%8A%A4%ED%80%98%EC%96%B4+%EC%84%9C%EC%9A%B8" class="uitk-card-link"><span class="is-visually-hidden">JW 메리어트 동대문 스퀘어 서울에 대한 상세 정보, 새 탭에서 열림</span></a>


# 호텔 링크 리스트
#hotel_link_list_byFindAll = soup.find_all('a', class_='uitk-card-link')  #a태그 중 class="uitk-card-link"를 긁어모아서
#print(f'hotel_link_list_byFindAll: {len(hotel_link_list_byFindAll)}')

#if len(hotel_link_list_byFindAll) != 0:
#    for index, anchor in enumerate(hotel_link_list_byFindAll, start=1):
#        print(f'{index}: {anchor.get('href')}') # index: href값으로 출력

hotel_link_list_bySelect = soup.select('a.uitk-card-link') #css 선택자와 같음
print(f'hotel_link_list_bySelect: {len(hotel_link_list_bySelect)}')

if len(hotel_link_list_bySelect) != 0:
    for index, anchor in enumerate(hotel_link_list_bySelect, start=1):
        print(f'{index}: {anchor.get('href')}')




#호텔정보
#html = requests.get("https://kr.hotels.com/ho447673/jw-melieoteu-dongdaemun-seukweeo-seoul-seoul-hangug/?chkin=2024-10-13&chkout=2024-10-15&x_pwa=1&rfrr=HSR&pwa_ts=&referrerUrl=&useRewards=true&rm1=a2&regionId=3124&destination=서울,한국&destType=MARKET&neighborhoodId=&latLong=&sort=RECOMMENDED&top_dp=&top_cur=KRW&userIntent=&selectedRoomType=&selectedRatePlan=&expediaPropertyId=&searchId=&propertyName=")
#https://kr.hotels.com/ho447673/jw-melieoteu-dongdaemun-seukweeo-seoul-seoul-hangug/?chkin=2024-10-13&chkout=2024-10-15&x_pwa=1&rfrr=HSR&pwa_ts=1728480188690&referrerUrl=aHR0cHM6Ly9rci5ob3RlbHMuY29tL0hvdGVsLVNlYXJjaA%3D%3D&useRewards=true&rm1=a2&regionId=3124&destination=%EC%84%9C%EC%9A%B8%2C+%ED%95%9C%EA%B5%AD&destType=MARKET&neighborhoodId=553248635976382905&latLong=37.566535%2C126.977969&sort=RECOMMENDED&top_dp=515000&top_cur=KRW&userIntent=&selectedRoomType=200583280&selectedRatePlan=211146888&expediaPropertyId=7228890&searchId=5ecd396a-ec8e-469a-9c44-e8ce342242dc&propertyName=JW+%EB%A9%94%EB%A6%AC%EC%96%B4%ED%8A%B8+%EB%8F%99%EB%8C%80%EB%AC%B8+%EC%8A%A4%ED%80%98%EC%96%B4+%EC%84%9C%EC%9A%B8
#https://kr.hotels.com/ho752661472/nobotel-aembaeseodeo-seoul-dongdaemun-hotel-lejideonseu-seoul-hangug/?chkin=2024-10-13&chkout=2024-10-15&x_pwa=1&rfrr=HSR&pwa_ts=1728480188690&referrerUrl=aHR0cHM6Ly9rci5ob3RlbHMuY29tL0hvdGVsLVNlYXJjaA%3D%3D&useRewards=true&rm1=a2&regionId=3124&destination=%EC%84%9C%EC%9A%B8%2C+%ED%95%9C%EA%B5%AD&destType=MARKET&neighborhoodId=553248635976383325&latLong=37.566535%2C126.977969&sort=RECOMMENDED&top_dp=370000&top_cur=KRW&userIntent=&selectedRoomType=217808663&selectedRatePlan=272039437&expediaPropertyId=23489421&searchId=5ecd396a-ec8e-469a-9c44-e8ce342242dc&propertyName=%EB%85%B8%EB%B3%B4%ED%85%94+%EC%95%B0%EB%B0%B0%EC%84%9C%EB%8D%94+%EC%84%9C%EC%9A%B8+%EB%8F%99%EB%8C%80%EB%AC%B8+%ED%98%B8%ED%85%94+%26+%EB%A0%88%EC%A7%80%EB%8D%98%EC%8A%A4

        


#야놀자, 여기어때, 트리바고 X

#접속할 웹사이트 url
#호텔스컴바인 서울
#html = requests.get("https://www.hotelscombined.co.kr/hotels/서울,서울특별시,대한민국-p22028/2024-10-15/2024-10-16/2adults;map?sort=rank_a")

#트립닷컴 서울
#html = requests.get("https://kr.trip.com/hotels/list?city=274&provinceId=0&countryId=42&checkIn=2024-10-08&checkOut=2024-10-09&lat=0&lon=0&districtId=0&barCurr=KRW&searchType=CT&searchWord=%EC%84%9C%EC%9A%B8&crn=1&adult=2&children=0&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=false")

#네이버호텔 서울
#html = requests.get("https://hotels.naver.com/places/KR1000073?adultCnt=2&childAges=")

#아고다

