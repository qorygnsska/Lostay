import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'

const {kakao} = window;


export default function HotelMap() {

    const Location = '서초동 1330-3'; // 기본주소

    const geocoder = new kakao.maps.services.Geocoder();

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


    useEffect(() => {
        const container = document.getElementById('KakaoMap');

        getLatLngFromAddress(Location)
            .then(latLng => {
                const options = {
                    center: latLng,
                    level: 3,
                };
                const map = new kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
                
            })
            .catch(error => {
                console.error(error);
            });
       
    }, []);

    const startRef = useRef();
    const endRef = useRef();

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


    // 길찾기 시작
    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 제출 방지

        const startAddress = startRef.current.value;
        const endAddress = endRef.current.value;

        try {
            // 출발지와 도착지의 위도, 경도 구하기
            const startCoords = await getLatLngFromAddress2(startAddress);
            const endCoords = await getLatLngFromAddress2(endAddress);

            console.log('출발지 위도:', startCoords.latitude);
            console.log('출발지 경도:', startCoords.longitude);
            console.log('도착지 위도:', endCoords.latitude);
            console.log('도착지 경도:', endCoords.longitude);

            // 길찾기 API 호출
            const routeData = await getRoute(startCoords.longitude, startCoords.latitude, endCoords.longitude, endCoords.latitude);
            console.log('길찾기 데이터:', routeData);

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
                            <input type='text' name='start' id='start' placeholder='출발지를 입력하세요.' ref={startRef} required/>
                        </div>
                        <div>
                            <input type='text' name='end' id='end' placeholder='도착지를 입력하세요.' ref={endRef} required/>
                        </div>
                      
                        <input type='submit' value="길찾기" id='searchBtn' hidden/>
                    </form>
                </div>
            </div>

            <div id='KakaoMap'>

            </div>
        </Container>


    )
}

