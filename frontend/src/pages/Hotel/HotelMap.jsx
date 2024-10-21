import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, FormControl, InputGroup, ListGroup, Modal } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const {kakao} = window;


export default function HotelMap() {

    const { search } = useLocation();
    const location = new URLSearchParams(search).get('location'); // 쿼리 파라미터에서 location 값 가져오기

    const Location = '서초동 1330-3'; // 기본주소

    const geocoder = new kakao.maps.services.Geocoder();

    // 마커
    const [map, setMap] = useState(null);
    const [roadPolylines, setRoadPolylines] = useState([]);
    const [startMarker, setStartMarker] = useState(null);
    const [endMarker, setEndMarker] = useState(null);

    const [distance, setDistance] = useState(0); // 거리
    const [duration, setDuration] = useState(0); // 소요시간
    const [fare, setFare] = useState({toll: 0, taxi: 0}); // 통행료

    const [isVisible, setIsVisible] = useState(false); // div 표시

    // 모달
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장

    // 모달 컴포넌트 생성 함수
    const renderModal = (isOpen, closeModal, inputRef) => (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>주소 검색</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="키워드를 입력하세요."
                        onChange={(e) => searchKeyword(e.target.value)}
                    />
                </InputGroup>
                <ListGroup>
                    {searchResults.map((result) => (
                        <ListGroup.Item
                            key={result.id}
                            onClick={() => handleSelectAddress(result.address_name, inputRef, closeModal)}
                            style={{ cursor: 'pointer' }}
                        >
                            {result.place_name} - {result.address_name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );

    // 검색 API 호출 함수
    const searchKeyword = async (keyword) => {
        if (!keyword) return;

        const places = new kakao.maps.services.Places(); // Kakao Places 인스턴스 생성
        places.keywordSearch(keyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                setSearchResults(data); // 검색 결과 저장
            } else {
                setSearchResults([]); // 검색 실패 시 빈 배열로 초기화
            }
        });
    };

    // 주소 선택 시 input에 값 넣고 모달 닫기 및 폼 전송
    const handleSelectAddress = async (address, inputRef, closeModal) => {
        inputRef.current.value = address; 
        closeModal(); 
        await handleSubmit(new Event('submit')); 
    };

    // 폼에서 주소 받아오기
    const startRef = useRef();
    const endRef = useRef();
        

    // 통행료 포맷 함수
    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    };


    // 기본주소 좌표로 바꾸기
    const getLatLngFromAddress = (address) => {
        return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const latLng = new kakao.maps.LatLng(result[0].y, result[0].x);
                    resolve(latLng);
                    
                } else {
                    reject(new Error('주소를 찾을 수 없습니다.'));
                }
            });
        });
    };


    // 맵 띄우기
    useEffect(() => {
        if (location) {
            endRef.current.value = location; // 폼의 출발지에 자동으로 채우기
        }
        const container = document.getElementById('KakaoMap');

        getLatLngFromAddress(Location)
            .then(latLng => {
                const options = {
                    center: latLng,
                    level: 3,
                };
                const newMap = new kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
                setMap(newMap);
                
            })
            .catch(error => {
                console.error(error);
            });
       
    }, []);


    // 길찾기 주소 좌표 구하기
    const getLatLngFromAddress2 = (address) => {
        return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const latitude = result[0].y; // 위도
                    const longitude = result[0].x; // 경도
                    resolve({ latitude, longitude }); // 객체 형태로 반환
                } else {
                    reject(new Error('주소를 찾을 수 없습니다.'));
                }
            });
        });
    };

    // 좌표로 경로 길찾기
    const getRoute = async (startLng, startLat, endLng, endLat) => {
        const response = await fetch(`https://apis-navi.kakaomobility.com/v1/directions?origin=${startLng},${startLat}&destination=${endLng},${endLat}`, {
            method: 'GET',
            headers: {
                'Authorization': 'KakaoAK e7ab8a10bdbdf2faeb0d6c4585cc393a', // REST API 키 입력
            }
        });
        
        if (!response.ok) {
            throw new Error('길찾기 정보를 가져오는 데 실패했습니다.');
        }
        
        const data = await response.json();
        return data; // 경로 데이터 반환
    };


    // 마커 찍기
    const addMarker = (coords) => {
        if (!map) return; // 지도가 없으면 종료

        const markerPosition = new kakao.maps.LatLng(coords.latitude, coords.longitude);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map); // 마커를 지도에 추가
        return marker;
    };

    // 마커지우기
    const removeMarkers = () => {
        if (startMarker) {
            startMarker.setMap(null); // 출발지 마커 제거
        }
        if (endMarker) {
            endMarker.setMap(null); // 목적지 마커 제거
        }
    };



    // 색상 결정 함수
    const getRoadColor = (trafficState) => {
        switch (trafficState) {
            case 0: // 교통상태 정보 없음
                return 'rgb(211, 211, 211)';
            case 1: // 교통 정체
                return 'rgb(235, 75, 56)';
            case 2: // 교통 지체
                return 'rgb(232, 164, 57)';
            case 3: // 교통 서행
                return 'rgb(235, 208, 69)';
            case 4: // 교통 원활
                return 'rgb(101, 202, 67)';
            case 6: // 교통사고(통행 불가)
                return 'black';
        }
    }

   // 도로 선 그리기
    const drawRoads = (roads) => {
        const newPolylines = roads.map(roadItem => {
            // vertexes 배열에서 좌표를 추출
            const path = [];
            for (let i = 0; i < roadItem.vertexes.length; i += 2) {
                const longitude = roadItem.vertexes[i];
                const latitude = roadItem.vertexes[i + 1];
                path.push(new kakao.maps.LatLng(latitude, longitude));
            }
            
            const color = getRoadColor(roadItem.traffic_state);
            const polyline = new kakao.maps.Polyline({
                path: path,
                strokeWeight: 10,
                strokeColor: color,
                strokeOpacity: 1,
                strokeStyle: 'solid',
            });
            polyline.setMap(map); // 맵에 선 그리기
            return polyline; // 선 객체를 배열에 저장
        });
        setRoadPolylines(newPolylines); // 새로운 선 객체 배열로 업데이트
    };


    // 도로 선 지우기
    const clearRoads = () => {
        roadPolylines.forEach(polyline => {
            polyline.setMap(null); // 맵에서 선 제거
        });
        setRoadPolylines([]); // 선 객체 배열 초기화
    };




    // 길찾기 시작
    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 제출 방지

        const startAddress = startRef.current.value;
        const endAddress = endRef.current.value;

        try {
            // 출발지와 도착지의 위도, 경도 구하기
            const startCoords = await getLatLngFromAddress2(startAddress);
            const endCoords = await getLatLngFromAddress2(endAddress);

            // 길찾기 API 호출
            const routeData = await getRoute(startCoords.longitude, startCoords.latitude, endCoords.longitude, endCoords.latitude);
            console.log('길찾기 데이터:', routeData);

            // div css 변경
            setIsVisible(true);

            // 마커 지우고
            removeMarkers();

            // 마커 찍기
            const newStartMarker = addMarker(startCoords);
            const newEndMarker = addMarker(endCoords);

            setStartMarker(newStartMarker);
            setEndMarker(newEndMarker);

            // 두 마커의 위치를 포함하는 경계 계산
            const bounds = new kakao.maps.LatLngBounds();
            bounds.extend(new kakao.maps.LatLng(startCoords.latitude, startCoords.longitude));
            bounds.extend(new kakao.maps.LatLng(endCoords.latitude, endCoords.longitude));

            // 지도의 중심을 경계에 맞추고 줌 레벨 조정
            map.setBounds(bounds);

            // 거리(미터) → 거리(킬로미터)
            const distanceInKm = (routeData.routes[0].summary.distance / 1000).toFixed(2); // 소수점 둘째 자리까지
            setDistance(distanceInKm);

            // 소요시간(초) → 시간 및 분
            const durationInSec = routeData.routes[0].summary.duration;
            const hours = Math.floor(durationInSec / 3600);
            const minutes = Math.floor((durationInSec % 3600) / 60);
            const formattedDuration = `${hours}시간 ${minutes}분`;
            setDuration(formattedDuration);

            // 통행료
            setFare(routeData.routes[0].summary.fare);

            const road = (routeData.routes[0].sections[0].roads);

            // 선 지우기
            clearRoads();

            // 선 그리기
            drawRoads(road);

        } catch (error) {
            console.error(error);
        }
   
    };

   

    
    return (

        <Container className='hotel--map--container'>
            <div className='TopBox'>
                <div className='FormBox'>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type='text' name='start' id='start' placeholder='출발지를 입력하세요.' ref={startRef} onClick={() => setIsStartModalOpen(true)} readOnly required/>
                            {renderModal(isStartModalOpen, () => setIsStartModalOpen(false), startRef)}
                        </div>
                        <div>
                            <input type='text' name='end' id='end' placeholder='도착지를 입력하세요.' ref={endRef} onClick={() => setIsEndModalOpen(true)} readOnly required/>
                            {renderModal(isEndModalOpen, () => setIsEndModalOpen(false), endRef)}
                        </div>
                      
                        <input type='submit' value="길찾기" id='searchBtn' hidden/>
                    </form>
                </div>
            </div>

            <div id='KakaoMap'>
                <div className={`FindInfo ${isVisible ? '' : 'hidden'}`}>
                    <div className='timeInfo'>
                        <div id='time'>{duration}</div>
                        <div id='km'>{distance}km</div>
                    </div>
                    <div className='fareInfo'>
                        <div id='toll'>통행료 : 약 {formatCurrency(fare.toll)} |</div>
                        <div id='taxi'>택시비 : 약 {formatCurrency(fare.taxi)}~</div>
                    </div>
                </div>
            </div>
        </Container>


    )
}

