from selenium import webdriver
from selenium.webdriver.common.by import By
import time 
import os
import requests
import random
import re
from PIL import Image
import io




# 웹 사이트 고정 창 
options = webdriver.ChromeOptions()
#options.add_argument("headless")
#options.add_argument("disable-gpu")
# 너비랑 높이를 고정으로 설정 
options.add_argument("window-size=1800,1000")

driver = webdriver.Chrome(options=options)

# 지역 폴더 생성
location_folder = f'jejudo'
os.makedirs(location_folder, exist_ok=True)  # 지역 폴더 생성

# 호텔 폴더 생성
hotel_folder = os.path.join(location_folder, 'hotel')
os.makedirs(hotel_folder, exist_ok=True)  # 호텔 폴더 생성

page=5
driver.get(f'https://www.yeogi.com/domestic-accommodations?sortType=RECOMMEND&keyword=%EC%A0%9C%EC%A3%BC%EB%8F%84&page={page}&personal=1&checkIn=2024-10-21&checkOut=2024-10-22&reservationActive=STAY&category=2&freeForm=true')

hotel_lest = driver.find_elements(By.CSS_SELECTOR, 'a.gc-thumbnail-type-seller-card')
links = [ele.get_attribute('href') for ele in hotel_lest]

num = (page-1)*20 +1

for hotel_id, link in enumerate(links):

    hotel_thumbnail = ''
    hotel_thumbnail_name=''
    hotel_images = []
    hotel_name = ''
    hotel_service = []
    hotel_info = ''
    hotel_location = ''
    hotel_touristPlace=[]
    hotel_level=''
    hhotel_images_name=[]

    hotel_list_folder=''
    thumbnail_folder=''
    images_folder=''
    images_path_str = ''
    hotel_service_str = ''
    hotel_touristPlace_str = ''


    print(f"링크: {link}")
    driver.get(link)

    try:

        while True:
            try:
                # 호텔 이미지 가져오기
                driver.find_element(By.CSS_SELECTOR, '#overview > article > div.css-12lmpk7 > ul > div > button').click()
                time.sleep(2)
                image_elements = driver.find_elements(By.CSS_SELECTOR, 'div.css-v8cu58 img')
                image_urls = [img.get_attribute('src') for img in image_elements]

                for idx, url in enumerate(image_urls):
                    file_name = os.path.basename(url)
                    if idx == 0:
                        hotel_thumbnail = url

                    hotel_images.append(url)

                driver.find_element(By.CSS_SELECTOR, '#modal-wrapper > div > div > header > div > div.css-kytcrd').click()

                time.sleep(2)
                break
            except:
                hotel_images=[]
                time.sleep(2)

        

        # 호텔 폴더리스트 폴더 생성
        hotel_list_folder = os.path.join(hotel_folder, f'hotel_{num + hotel_id}')
        os.makedirs(hotel_folder, exist_ok=True)  # 호텔 폴더 생성

        # 썸네일 폴더 생성
        thumbnail_folder = os.path.join(hotel_list_folder, 'thumbnail')
        os.makedirs(thumbnail_folder, exist_ok=True)

        # 이미지 폴더 생성
        images_folder = os.path.join(hotel_list_folder, 'images')
        os.makedirs(images_folder, exist_ok=True)

        # 호텔 썸네일 저장
        if hotel_thumbnail:
            thumbnail_response = requests.get(hotel_thumbnail)
            if thumbnail_response.status_code == 200:
                hotel_thumbnail_name = os.path.basename(hotel_thumbnail).replace('.jpg', '.webp').replace('.png', '.webp')  # 파일명 변경
                img = Image.open(io.BytesIO(thumbnail_response.content))
                img.save(os.path.join(thumbnail_folder, hotel_thumbnail_name), format='WEBP', quality=80)  # 품질 설정

        # 호텔 이미지 저장
        for img_url in hotel_images:
            img_response = requests.get(img_url)
            if img_response.status_code == 200:
                img_name = os.path.basename(img_url).replace('.jpg', '.webp').replace('.png', '.webp')  # 파일명 변경
                img = Image.open(io.BytesIO(img_response.content))
                img.save(os.path.join(images_folder, img_name), format='WEBP', quality=80)  # 품질 설정


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
        
        # print('호텔명 : ',hotel_name)
        # print('호텔 등급 : ', hotel_level)
        # print('호텔소개 : ',hotel_info)
        # print('호텔서비스 : ',hotel_service)
        # print('호텔주소 : ',hotel_location)
        # print('호텔관광명소 : ',hotel_touristPlace)
        # print('호텔 썸네일 : ',hotel_thumbnail_name)
        # print('호텔 이미지 : ',hhotel_images_name)

        # 호텔 데이터 삽입 쿼리 출력
        thumbnail_path = os.path.join(thumbnail_folder, hotel_thumbnail_name)
        thumbnail_path = thumbnail_path.replace('\\', '/')
        images_path = [os.path.join(images_folder, img_name).replace('\\', '/') for img_name in hhotel_images_name]
        images_path_str = ', '.join(s for s in images_path)
        hotel_service_str = ', '.join(s for s in hotel_service)
        hotel_touristPlace_str = ', '.join(s for s in hotel_touristPlace)


        hotel_query = f'INSERT INTO HOTEL VALUES(DEFAULT, "{hotel_name}", "{thumbnail_path}", "{images_path_str}", "{hotel_service_str}", "{hotel_level}", "{hotel_location}", "{hotel_touristPlace_str}", "{hotel_info}");'

        with open('hotel_insert_queries.txt', 'a', encoding='utf-8') as file:
            file.write(hotel_query + '\n')  # 쿼리와 줄 바꿈 추가

        #객실 더보기 버튼이 있으면 클릭하기
        try:
            driver.find_element(By.CSS_SELECTOR, '#room > div.css-g6g7mu > div.css-gwn0rc > button').click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, '#__next > div > nav.css-1bnvjzx > div > div.css-1dtop59 > div > ul > li:nth-child(2)').click()
            time.sleep(2)
        except Exception as e:
            print(f"더보기 버튼 없음")

        

        # 객실
        room_list = driver.find_elements(By.CSS_SELECTOR, 'div.gc-domestic-item-card')
        
        # 룸 폴더 생성
        rooms_folder = os.path.join(hotel_list_folder, 'rooms')
        os.makedirs(rooms_folder, exist_ok=True)

        for room_idx, room in enumerate(room_list):
            room_images=[]
            number_person=''
            room_title=''
            room_info=[]
            room_service=[]
            room_price=''
            room_images_name=[]
            if room_idx == 0:
                pre_room_price='50,000'
                pre_room_checkin_time='15:00'
                pre_room_checkout_time='11:00'
            room_discount = 0
            room_folder=''
            room_thumbnail_folder=''
            room_images_folder=''
            room_images_path_str = ''
            room_service_str = ''
            room_info_str = ''


            # 객실 이름 가져오기
            get_room_title = room.find_element(By.CSS_SELECTOR, '.css-rs79op')
            room_title = get_room_title.text

            # 객실 인원수 가져오기
            try:
                get_number_person = room.find_element(By.CSS_SELECTOR, '.css-12ibmpc > div:nth-child(1) > div.css-1wr23hb')
                number_person = get_number_person.text
            except:
                get_number_person = room.find_element(By.CSS_SELECTOR, '.css-12ibmpc > div > div.css-1wr23hb')
                number_person = get_number_person.text


            # 최대 체크인 체크아웃 시간
            #room > div.css-g6g7mu > div:nth-child(14) > div.css-gp2jfw > div.css-hn31yc > div.css-1bpi9ty > div > div > div.css-1mmyylq > div.css-1tn66r8 > div:nth-child(1)
            #room > div.css-g6g7mu > div:nth-child(14) > div.css-gp2jfw > div.css-hn31yc > div.css-1bpi9ty > div > div > div.css-1mmyylq > div.css-1tn66r8 > div:nth-child(2)
            
            try:
                get_checkin_time = room.find_element(By.CSS_SELECTOR, 'div.css-1tn66r8 > div:nth-child(1)')
                checkin_time_text = get_checkin_time.text
                checkin_time = checkin_time_text.replace("입실 ", "")
                pre_room_checkin_time = checkin_time
    

                get_checkout_time = room.find_element(By.CSS_SELECTOR, 'div.css-1tn66r8 > div:nth-child(2)')
                checkout_time_text = get_checkout_time.text
                checkout_time = checkout_time_text.replace("퇴실 ", "")
                pre_room_checkout_time = checkout_time

            except:
                checkin_time=pre_room_checkin_time
                checkout_time=pre_room_checkout_time

            while True:
                try:
                    # 객실 썸네일 및 이미지 가져오기
                    try:
                        room.find_element(By.CSS_SELECTOR, 'div > div.css-1qsj5pv').click()
                    
                        time.sleep(2)
                    except:
                        room.find_element(By.XPATH, '//*[@id="room"]/div[3]/div[2]/div[1]/div/div[1]').click()
                        time.sleep(2)
                    
                    

                    image_elements = driver.find_elements(By.CSS_SELECTOR, 'div.css-v8cu58 img')
                    image_urls = [img.get_attribute('src') for img in image_elements]
                    
                    for idx, url in enumerate(image_urls):
                        if idx == 0:
                            room_thumbnail = url

                        room_images.append(url)

                    driver.find_element(By.CSS_SELECTOR, 'div.css-kytcrd').click()
                    time.sleep(2)
                    break
                except:
                    room_images=[]
                    time.sleep(2)
                


            # 객실별 폴더 생성
            room_folder = os.path.join(rooms_folder, f'room_{room_idx+1}')
            
            # 썸네일 폴더 생성
            room_thumbnail_folder = os.path.join(room_folder, 'thumbnail')
            os.makedirs(room_thumbnail_folder, exist_ok=True)

            # 이미지 폴더 생성
            room_images_folder = os.path.join(room_folder, 'images')
            os.makedirs(room_images_folder, exist_ok=True)

            # 룸 썸네일 저장
            if room_thumbnail:
                room_thumbnail_response = requests.get(room_thumbnail)
                if room_thumbnail_response.status_code == 200:
                    room_thumbnail_name = os.path.basename(room_thumbnail).replace('.jpg', '.webp').replace('.png', '.webp')  # 파일명 변경
                    img = Image.open(io.BytesIO(room_thumbnail_response.content))
                    img.save(os.path.join(room_thumbnail_folder, room_thumbnail_name), format='WEBP', quality=80)  # 품질 설정

            # 룸 이미지 저장
            for room_img_url in room_images:
                room_img_response = requests.get(room_img_url)
                if room_img_response.status_code == 200:
                    room_img_name = os.path.basename(room_img_url).replace('.jpg', '.webp').replace('.png', '.webp')  # 파일명 변경
                    img = Image.open(io.BytesIO(room_img_response.content))
                    img.save(os.path.join(room_images_folder, room_img_name), format='WEBP', quality=80)  # 품질 설정




            while True:
                try:
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
                    break
                except:
                    room_service=[]
                    room_info=[]
                    time.sleep(2)

            # print('객실 이름 : ',room_title)
            # print('객실 정보 : ',room_info)
            # print('객실 인원수 : ',number_person)
            # print('객실 편의시설 : ',room_service)
            # print('객실 썸네일 : ',room_thumbnail)
            # print('객실 이미지 : ',room_images)
            # print('객실 가격 : ',room_price)
            # print('객실 할인율 : ',room_discount)

            max_person = 0
            for info in room_info:
                match = re.search(r'최대\s*(\d+)', info)
                if match:
                    max_person = match.group(1)  # 숫자를 가져옴
                    break  # 첫 번째로 찾은 경우 루프 종료


            # 객실 데이터 삽입 쿼리 출력
            room_thumbnail_path = os.path.join(room_thumbnail_folder, room_thumbnail_name)
            room_thumbnail_path = room_thumbnail_path.replace('\\', '/')
            room_images_path = [os.path.join(room_images_folder, room_img_name).replace('\\', '/') for room_img_name in room_images_name]

            # print(f"INSERT INTO ROOM VALUES(DEFAULT,'{hotel_id+1}', '{room_title}', {max_person}, '{number_person}', {random.randint(1,5)}, '{room_thumbnail_path}', '{room_images_path}', "
            #     f"{int(room_price.replace(',', ''))}, '{room_discount}', '{room_service}', '{room_info}', "
            #     f"STR_TO_DATE('{checkin_time}', '%H:%i'), STR_TO_DATE('{checkout_time}', '%H:%i'));")
            
            room_images_path_str = ', '.join(s for s in room_images_path)
            room_service_str = ', '.join(s for s in room_service)
            room_info_str = ', '.join(s for s in room_info)
            
            room_query = (
                        f'INSERT INTO ROOM VALUES('
                        f'DEFAULT, '
                        f'{num + hotel_id}, '
                        f'"{room_title}", '
                        f'{max_person}, '
                        f'"{number_person}", '
                        f'{random.randint(1, 5)}, '
                        f'"{room_thumbnail_path}", '
                        f'"{room_images_path_str}", '
                        f'{int(room_price.replace(',', ''))}, '
                        f'"{room_discount}", '
                        f'"{room_service_str}", '
                        f'"{room_info_str}", '
                        f'STR_TO_DATE("{checkin_time}", "%H:%i"), '
                        f'STR_TO_DATE("{checkout_time}", "%H:%i"));'
            )

            with open('room_insert_queries.txt', 'a', encoding='utf-8') as file:
                file.write(room_query + '\n')  # 쿼리와 줄 바꿈 추가



            


    except Exception as e:
        print(f"에러 발생: {e}")
        driver.quit()



    
    driver.back()
    time.sleep(2)  # 원래 페이지 로딩 대기
time.sleep(2)
