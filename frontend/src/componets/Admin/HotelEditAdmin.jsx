import React, { useEffect, useState } from 'react'
import { adminPrivateApi } from '../../api/adminApi';
import { IoClose } from "react-icons/io5";

export default function HotelEditAdmin({ propHotel, hotelModalToggle, hotelModalShow }) {

    // ==================== START ======================== //
    // 저장된 호텔 정보들
    const [state, setState] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelCommission: '',
        hotelIntroduction: '',
    })

    useEffect(() => {
        if (propHotel) {
            setState({
                hotelName: propHotel.hotelName || '',
                hotelAddress: propHotel.hotelAdress || '',
                hotelCommission: propHotel.hotelCommission || '',
                hotelIntroduction: propHotel.hotelIntroduction || '',
            });

            setRateButton(propHotel.hotelRating.length > 0 ? propHotel.hotelRating : '없음')
            setActiveAmenitiesBtn(propHotel.hotelAmenitiesList)
            setThumbnail(propHotel.hotelThumbnail)
            setUploadThumbnail(null)
            setImages(propHotel.hotelImageList)
            const updatedLocations = Array(5).fill('').map((_, index) => propHotel.hotelTouristAttractionList[index] || '');
            setLocations(updatedLocations);

        }
    }, [propHotel]);
    // 저장된 호텔 정보들
    // ==================== END ======================== //


    // ==================== START ======================== //
    // 입력 관련 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const preventInvalidInput = (e) => {
        const { name, value } = e.target;

        // 숫자가 아닌 경우 입력을 무시하고 리턴
        if (/[^0-9]/.test(value)) {
            return; // 숫자가 아닌 경우 함수 종료
        }

        // 숫자인 경우 상태 업데이트
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // 입력 관련 함수
    // ==================== END ======================== //


    // ==================== START ======================== //
    // 등급 설정
    const rankBtn = ['특1급', '특급', '5성급', '4성급', '가족호텔', '리조트', '없음'];
    const [RateButton, setRateButton] = useState('');

    const clickRating = (rate) => {
        setRateButton(rate); // 클릭한 등급만 활성화
    };
    // 등급 설정
    // ==================== END ======================== //


    // ==================== START ======================== //
    // 시설 설정
    const [activeAmenitiesBtn, setActiveAmenitiesBtn] = useState([]);

    const amenitiesBtn = [
        '사우나', '수영장', '레스토랑', '라운지', '피트니스',
        '골프장', '엘리베이터', '공용PC', '바베큐', '카페',
        '공용스파', '편의점', '노래방', '주방/식당', '세탁기',
        '건조기', '탈수기', '주차장', '취사가능', '공용샤워실',
        '온천', '스키장',
        '조식제공', '무료주차', '객실내취사', '반려견동반',
        '객실내흡연', '발렛파킹', '금연', '프린터사용',
        '짐보관가능', '픽업서비스', '캠프파이어', '카드결제',
        '장애인편의', '바(BAR)', '미니바', '무선인터넷',
        '욕실용품', '에어컨', '드라이기', 'TV', '샤워실'
    ];

    function clickAmenities(name) {
        if (activeAmenitiesBtn.includes(name)) {
            // 이미 선택된 버튼 클릭 시 비활성화
            setActiveAmenitiesBtn(activeAmenitiesBtn.filter(button => button !== name));
        } else {
            // 새로운 버튼 클릭 시 활성화
            setActiveAmenitiesBtn([...activeAmenitiesBtn, name]);
        }
    }
    // 시설 설정
    // ==================== END ======================== //


    // ==================== START ======================== //
    // 썸네일 설정
    const [thumbnail, setThumbnail] = useState('');
    const [delThumbnail, setDelThumbnail] = useState('');
    const [uploadThumbnail, setUploadThumbnail] = useState('');

    const handlerUploadThumbnail = (e) => {
        setUploadThumbnail(e.target.files[0])
    }

    const handlerDelThumbnail = (imageFile) => {
        if (thumbnail === imageFile) {
            setDelThumbnail(thumbnail)
            setThumbnail(null)
        } else {
            setUploadThumbnail(null)
        }
    };
    // 썸네일 설정
    // ==================== END ======================== //


    // ==================== START ======================== //
    // 이미지 설정
    const [images, setImages] = useState([]);
    const [delImages, setDelImages] = useState([]);
    const [uploadImages, setUploadImages] = useState([]);

    // 이미지 삭제
    const handlerDelImages = (image) => {
        if (images.includes(image)) {
            const updatedImages = images.filter(img => img !== image);
            setImages(updatedImages);
            setDelImages(prevDelImages => [...prevDelImages, image]);
        } else {
            const updatedImages = uploadImages.filter(img => img !== image);
            setUploadImages(updatedImages)
        }
    }

    // 새로 추가할 이미지
    const handlerUploadImages = (e) => {
        const filesArray = Array.from(e.target.files);

        if (checkForDuplicateImages(filesArray)) {
            alert('이름이 중복된 이미지가 있습니다.')
        } else {
            setUploadImages(filesArray);
        }
    }

    // 중복 이름 체크
    const checkForDuplicateImages = (filesArray) => {
        return filesArray.some(file => images.includes(file.name));
    };

    // 이미지 설정
    // ==================== END ======================== //

    // ==================== START ======================== //
    // 서버로 데이터 보내기
    const handelerUpdate = async () => {
        const formData = new FormData();


        formData.append('hotelNo', propHotel.hotelNo);
        formData.append('hotelName', state.hotelName);
        formData.append('hotelCommission', state.hotelCommission);
        formData.append('hotelAdress', state.hotelAddress);
        formData.append('hotelIntroduction', state.hotelIntroduction);

        formData.append('hotelRating', RateButton === '없음' ? '' : RateButton);
        formData.append('hotelAmenities', activeAmenitiesBtn)
        formData.append('hotelTouristAttractionList', locations.filter(loc => loc !== ''))

        formData.append('uploadThumbnail', uploadThumbnail);
        formData.append('hotelDelThumbnail', delThumbnail);
        uploadImages.forEach((file) => {
            formData.append('uploadImages', file);
        })
        formData.append('hotelDelImages', delImages);


        try {
            const response = await adminPrivateApi.put('/admin/hotelUpdate', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            if (response.status === 200) {
                alert('업뎃완료')
                hotelModalToggle(true)
            } else {
                alert('업뎃실패')
            }

        } catch (error) {
            alert('업뎃실패')
        }


    }

    // 서버로 데이터 보내기
    // ==================== END ======================== //


    // ==================== START ======================== //
    // 관광명소
    const [locations, setLocations] = useState(Array(5).fill(''));

    const handleInputChange = (index, value) => {
        const updatedLocations = [...locations];
        updatedLocations[index] = value || ''; // 특정 인덱스의 값 업데이트
        setLocations(updatedLocations);
    };

    // 관광명소
    // ==================== END ======================== //
    return (
        <div className={`hotel--edit--admin--container ${hotelModalShow && 'open'}`}>

            <div>
                <button type='button' onClick={handelerUpdate}>수정</button>
                <button type='button' onClick={() => hotelModalToggle()}>취소</button>
            </div>
            <div className='top--content'>
                <div className='top--box'>
                    <div className='title'>호텔명</div>
                    <input
                        name='hotelName'
                        value={state.hotelName}
                        onChange={handleChange}
                        type='text'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>중개료</div>
                    <input
                        name="hotelCommission"
                        value={state.hotelCommission}
                        onInput={preventInvalidInput}
                        type='text'
                    />
                </div>
            </div>


            <div className='mid--box'>
                <div className='title'>주소</div>
                <input
                    name="hotelAddress"
                    value={state.hotelAddress}
                    onChange={handleChange}
                    type='text'
                    className='address'
                />
            </div>


            <div className='mid--box'>
                <div className='title'>소개</div>
                <textarea
                    name="hotelIntroduction"
                    value={state.hotelIntroduction}
                    onChange={handleChange}
                    className='introduction'
                />
            </div>



            <div className='mid--box'>
                <div className='title'>등급</div>
                <div className='selected--box'>
                    {rankBtn.map(name => (
                        <input type='button' className='selected--btn' value={name} key={name} name={name} id={name}
                            onClick={() => clickRating(name)}
                            style={{
                                backgroundColor: RateButton.includes(name) ? 'rgb(237, 247, 255)' : '',
                                color: RateButton.includes(name) ? 'rgb(0, 83, 192)' : '',
                                border: RateButton.includes(name) ? '1px solid rgb(167, 215, 255)' : ''
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className='mid--box'>
                <div className='title'>시설</div>
                <div className='selected--box'>
                    {amenitiesBtn.map(name => (
                        <input type='button' className='selected--btn' value={name} key={name} name={name} id={name}
                            onClick={(e) => clickAmenities(e.target.name)}
                            style={{
                                backgroundColor: activeAmenitiesBtn.includes(name) ? 'rgb(237, 247, 255)' : '',
                                color: activeAmenitiesBtn.includes(name) ? 'rgb(0, 83, 192)' : '',
                                border: activeAmenitiesBtn.includes(name) ? '1px solid rgb(167, 215, 255)' : ''
                            }}
                        />
                    ))}
                </div>
            </div>


            <div className='mid--box'>
                <div className='title'>썸네일</div>
                <div className='image--box'>

                    <input
                        id="file-selector"
                        type="file"
                        accept="image/*"
                        onChange={handlerUploadThumbnail}
                        disabled={thumbnail || uploadThumbnail}
                    />


                    <div className='image--file--box'>
                        {thumbnail &&
                            <div className='image'>
                                {thumbnail.split('/').pop()}
                                <IoClose className='delete--file' onClick={() => handlerDelThumbnail(thumbnail)} />
                            </div>
                        }
                        {uploadThumbnail &&
                            <div className='image'>
                                {uploadThumbnail.name}
                                <IoClose className='delete--file' onClick={() => handlerDelThumbnail(uploadThumbnail)} />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='mid--box'>
                <div className='title'>이미지</div>
                <div className='image--box'>
                    <input
                        id="file-selector"
                        type="file"
                        accept="image/*"
                        onChange={handlerUploadImages}
                        multiple
                    />


                    <div className='image--file--box'>
                        {images &&
                            images.map((image, index) => (
                                <div className='image' key={index}>
                                    {image.split('/').pop()}
                                    <IoClose className='delete--file' onClick={() => handlerDelImages(image)} />
                                </div>
                            ))}
                        {uploadImages &&
                            uploadImages.map((image, index) => (
                                <div className='image'>
                                    {image.name}
                                    <IoClose className='delete--file' onClick={() => handlerDelImages(image)} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className='mid--box'>
                <div className='title'>관광명소</div>
                {locations.map((loc, index) => (
                    <div className='tourist--attraction--box' key={index}>
                        <input
                            type="text"
                            value={loc || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div >
    )
}
