from selenium import webdriver
from selenium.webdriver.common.by import By
import time 






# 웹 사이트 고정 창 
options = webdriver.ChromeOptions()
#options.add_argument("headless")
#options.add_argument("disable-gpu")
# 너비랑 높이를 고정으로 설정 
options.add_argument("window-size=1800,1000")

driver = webdriver.Chrome(options=options)
for i in range(1,11):
    driver.get(f'https://www.yeogi.com/domestic-accommodations?sortType=RECOMMEND&keyword=%EC%A0%9C%EC%A3%BC%EB%8F%84&page={i}&personal=1&checkIn=2024-10-23&checkOut=2024-10-24&category=2&freeForm=true')

    hotel_lest = driver.find_elements(By.CSS_SELECTOR, 'a.gc-thumbnail-type-seller-card')
    links = [ele.get_attribute('href') for ele in hotel_lest]

    for hotel_id, link in enumerate(links):

        hotel_thumbnail = ''
        hotel_images = []
        hotel_name = ''
        hotel_service = []
        hotel_info = ''
        hotel_location = ''
        hotel_touristPlace=[]
        hotel_level=''

        room_title = []
        number_person = []
        room_thumbnail = ''
        room_images = []

        print(f"링크: {link}")
        driver.get(link)

        try:
            # 호텔 이미지 가져오기
            driver.find_element(By.CSS_SELECTOR, '#overview > article > div.css-12lmpk7 > ul > div > button').click()
            time.sleep(2)
            image_elements = driver.find_elements(By.CSS_SELECTOR, 'div.css-v8cu58 img')
            image_urls = [img.get_attribute('src') for img in image_elements]

            for idx, url in enumerate(image_urls):
                if idx == 0:
                    hotel_thumbnail = url

                hotel_images.append(url)

            driver.find_element(By.CSS_SELECTOR, '#modal-wrapper > div > div > header > div > div.css-kytcrd').click()

            time.sleep(2)



            # 호텔 이름 가져오기
            get_hotel_name = driver.find_elements(By.CSS_SELECTOR, 'h1.css-17we8hh')
            if not get_hotel_name:
                hotel_name = ''
            else:
                hotel_name = get_hotel_name[0].text

            # 호텔 성급 가져오기
            get_hotel_level = driver.find_elements(By.CSS_SELECTOR, '#overview > div.css-1yaqp6x > div.css-hn31yc > div > div > div:nth-child(3) > span:nth-child(2)')
            if not get_hotel_level:
                hotel_level = ''
            else:
                hotel_level = get_hotel_level[0].text

            # 호텔 시설 정보 가져오기
            get_hotel_service =driver.find_elements(By.CSS_SELECTOR, '.css-i3rab1')
            
            if not get_hotel_service:
                print("시설 정보가 없습니다.")
            else:
                for facility in get_hotel_service:
                    hotel_service.append(facility.text)



            # 호텔 소개글 가져오기
            get_hotel_info = driver.find_elements(By.CSS_SELECTOR, 'p.css-l22fxz')
            if not get_hotel_info:
                hotel_info=''
            else:
                hotel_info = get_hotel_info[0].text


            # 호텔 주소 가져오기
            get_hotel_location = driver.find_elements(By.CSS_SELECTOR, '#location > div.css-1rdjshf > ul > div > p')
            if not get_hotel_location:
                hotel_location = ''
            else:
                hotel_location = get_hotel_location[0].text

            # 관광명소 가져오기
            get_hotel_touristPlace = driver.find_elements(By.CSS_SELECTOR, '#location > div.css-1rdjshf > ul > section > div > ul > li')
            if not get_hotel_touristPlace:
                hotel_touristPlace = ''
            else:
                for place in get_hotel_touristPlace:
                    hotel_touristPlace.append(place.text)
            
            print('호텔명 : ',hotel_name)
            print('호텔 등급 : ', hotel_level)
            print('호텔소개 : ',hotel_info)
            print('호텔서비스 : ',hotel_service)
            print('호텔주소 : ',hotel_location)
            print('호텔관광명소 : ',hotel_touristPlace)
            print('호텔 썸네일 : ',hotel_thumbnail)
            print('호텔 이미지 : ',hotel_images)
            print(f"INSERT INTO HOTEL VALUES('{hotel_name}', '{hotel_thumbnail}', '{hotel_images}', '{hotel_service}', '{hotel_level}', '{hotel_location}', '{hotel_touristPlace}', '{hotel_info}')")

            #객실 더보기 버튼이 있으면 클릭하기
            try:
                driver.find_element(By.CSS_SELECTOR, '#room > div.css-g6g7mu > div.css-gwn0rc > button').click()
                time.sleep(2)
            except Exception as e:
                print(f"더보기 버튼 없음")

            driver.find_element(By.CSS_SELECTOR, '#__next > div > nav.css-1bnvjzx > div > div.css-1dtop59 > div > ul > li:nth-child(2)').click()
            time.sleep(2)

            # 객실
            room_list = driver.find_elements(By.CSS_SELECTOR, 'div.gc-domestic-item-card')
            
            for idx, room in enumerate(room_list):
                room_images=[]
                number_person=''
                room_title=''
                room_info=[]
                room_service=[]
                room_price=''
                if idx == 0:
                    pre_room_price='50,000'
                room_discount = 0

                # 객실 이름 가져오기
                get_room_title = room.find_element(By.CSS_SELECTOR, '.css-rs79op')
                room_title = get_room_title.text

                # 객실 인원수 가져오기
                get_number_person = room.find_element(By.CSS_SELECTOR, '.css-12ibmpc > div:nth-child(1) > div.css-1wr23hb')
                number_person = get_number_person.text

                # 객실 썸네일 및 이미지 가져오기
                room.find_element(By.CSS_SELECTOR, 'div.css-1qsj5pv').click()
                time.sleep(2)

                image_elements = driver.find_elements(By.CSS_SELECTOR, 'div.css-v8cu58 img')
                image_urls = [img.get_attribute('src') for img in image_elements]
                
                for idx, url in enumerate(image_urls):
                    if idx == 0:
                        room_thumbnail = url

                    room_images.append(url)

                driver.find_element(By.CSS_SELECTOR, 'div.css-kytcrd').click()
                time.sleep(2)

                # 객실 정보 및 시설 서비스 가져오기
                room.find_element(By.CSS_SELECTOR, 'div.css-jyer5m').click()
                time.sleep(2)

                # 객실 정보
                get_room_info = driver.find_elements(By.CSS_SELECTOR, '#modal-wrapper > div > div > div > div > section:nth-child(3) > div > ul > li')
                if not get_room_info:
                    room_info = ''
                else:
                    for info in get_room_info:
                        room_info.append(info.text)

                # 객실 가격 및 할인율
                try:
                    # 오리지널 가격
                    get_room_price = room.find_element(By.CSS_SELECTOR, 'div.css-1pwu6pz > div:nth-child(1)')
                    room_price = get_room_price.text

                    # 디스카운트 가격
                    get_room_dis_price = room.find_element(By.CSS_SELECTOR, 'div.css-a34t1s')
                    room_dis_price = get_room_dis_price.text
    
                    # 할인율 계산
                    room_discount = int((int(room_price.replace(',','')) - int(room_dis_price.replace(',',''))) / int(room_price.replace(',','')) * 100)

                    # get_room_discount = room.find_element(By.CSS_SELECTOR,'div.gc-tag.css-bm68df > span')
                    # room_discount_text = get_room_discount.text

                    # match = re.search(r'(\d+)%', room_discount_text)
                    # if match:
                    #     room_discount = int(match.group(1))

                except Exception as e:
                    try:
                        get_room_price = room.find_element(By.CSS_SELECTOR, 'div.css-a34t1s')
                        room_price = get_room_price.text
                    except Exception as e:
                        room_price = f"{int(pre_room_price.replace(',','')) + 10000:,}"
                if not room_price:
                    room_price = pre_room_price  
                pre_room_price = room_price

                # 객실 편의 시설
                parent_elements = driver.find_elements(By.CSS_SELECTOR, '#modal-wrapper > div > div > div > div > div > section')

                for parent_element in parent_elements:

                    convenience_section = parent_element.find_elements(By.CSS_SELECTOR, '.css-11xa1an')

                    for section in convenience_section:

                        if '편의시설' in section.text:
                            get_room_service = parent_element.find_elements(By.CSS_SELECTOR, 'div > ul > li')
                            if not get_room_service:
                                room_service = ''
                            else:
                                for service in get_room_service:
                                    room_service.append(service.text)

                    

                driver.find_element(By.CSS_SELECTOR, 'div.css-kytcrd').click()
                time.sleep(2)

                print('객실 이름 : ',room_title)
                print('객실 정보 : ',room_info)
                print('객실 인원수 : ',number_person)
                print('객실 편의시설 : ',room_service)
                print('객실 썸네일 : ',room_thumbnail)
                print('객실 이미지 : ',room_images)
                print('객실 가격 : ',room_price)
                print('객실 할인율 : ',room_discount)


                


        except Exception as e:
            print(f"에러 발생: {e}")
            driver.quit()



        
        driver.back()
        time.sleep(2)  # 원래 페이지 로딩 대기
    time.sleep(2)
 
time.sleep(20)