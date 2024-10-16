import React, { useEffect } from 'react'

const {kakao} = window;

export default function KakaoMap({Location}) {

    const geocoder = new kakao.maps.services.Geocoder();

    const getLatLngFromAddress = (address) => {
        return new Promise((resolve, reject) => {
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const latLng = new kakao.maps.LatLng(result[0].y, result[0].x);
                    resolve(latLng);
                    console.log(latLng);
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
                    draggable: false,
                    disableDoubleClickZoom: true,
                };
                const map = new kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴

                const markerPosition = latLng;
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    clickable: true,
                });
                
                marker.setMap(map);

            })
            .catch(error => {
                console.error(error);
            });
       
    }, []);

  return (
    <div className='kakao--map--container'>
        <div id='KakaoMap'></div>
    </div>
  )
}
