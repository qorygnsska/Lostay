import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { adminPrivateApi } from '../../api/adminApi';

export default function RoomEditAdmin({ propRoom, roomModalToggle, roomModalShow }) {

    // ==================== START ======================== //
    // 저장된 호텔 정보들
    const [state, setState] = useState({
        roomName: propRoom?.roomName || '',
        roomCount: propRoom?.roomCount || 0,
        roomPrice: propRoom?.roomPrice || 0,
        roomDiscount: propRoom?.roomDiscount || 0,
        roomPeopleMax: propRoom?.roomPeopleMax || 0,
        roomPeopleInfo: propRoom?.roomPeopleInfo || '',
        roomCheckinTime: propRoom?.roomCheckinTime || '',
        roomCheckoutTime: propRoom?.roomCheckoutTime || '',
    })

    useEffect(() => {
        if (propRoom) {
            setState({
                roomName: propRoom.roomName,
                roomCount: propRoom.roomCount,
                roomPrice: propRoom.roomPrice,
                roomDiscount: propRoom.roomDiscount,
                roomPeopleMax: propRoom.roomPeopleMax,
                roomPeopleInfo: propRoom.roomPeopleInfo,
                roomCheckinTime: propRoom.roomCheckinTime,
                roomCheckoutTime: propRoom.roomCheckoutTime,
            });

            setActiveAmenitiesBtn(propRoom.roomAmenitiesList)
            setThumbnail(propRoom.roomThumbnail)
            setUploadThumbnail(null)
            setImages(propRoom.roomImageList)
            const updatedIntrodution = Array(8).fill('').map((_, index) => propRoom.roomIntroductionList[index] || '');
            setIntroduction(updatedIntrodution);



        }
    }, [propRoom]);
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
    // 시설 설정
    const [activeAmenitiesBtn, setActiveAmenitiesBtn] = useState([]);

    const amenitiesBtn = [
        'TV', '쇼파', '옷장', '데스크', '에어컨',
        '미니바', '헤어드라이기', '욕실용품', '샤워가운',
        '슬리퍼', '금고', '전화기', '다리미', '침대',
        '책상', '침구류', '스마트 TV', '욕실용품 (유료)',
        '생수', '체중계', '스마트 전화기', 'PC', '넷플릭스', '커피포트',
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
    // 객실 소개
    const [introduction, setIntroduction] = useState(Array(8).fill(''));

    const handleInputChange = (index, value) => {
        const updatedIntroduction = [...introduction];
        updatedIntroduction[index] = value; // 특정 인덱스의 값 업데이트
        setIntroduction(updatedIntroduction);
    };

    // 객실 소개
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


        formData.append('roomNo', propRoom.roomNo);
        formData.append('roomName', state.roomName);
        formData.append('roomCount', state.roomCount);
        formData.append('roomPrice', state.roomPrice);
        formData.append('roomDiscount', state.roomDiscount);
        formData.append('roomPeopleMax', state.roomPeopleMax);
        formData.append('roomPeopleInfo', state.roomPeopleInfo);
        formData.append('roomCheckinTime', formatTimeForLocalTime(state.roomCheckinTime));
        formData.append('roomCheckoutTime', formatTimeForLocalTime(state.roomCheckoutTime));

        formData.append('roomAmenities', activeAmenitiesBtn)

        formData.append('roomIntroductionList', introduction.filter(loc => loc !== ''))

        formData.append('uploadThumbnail', uploadThumbnail);
        formData.append('roomDelThumbnail', delThumbnail);
        uploadImages.forEach((file) => {
            formData.append('uploadImages', file);
        })
        formData.append('roomDelImages', delImages);


        try {
            const response = await adminPrivateApi.put('/admin/roomUpdate', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            if (response.status === 200) {
                alert('업뎃완료')
                roomModalToggle(true)
            } else {
                alert('업뎃실패')
            }

        } catch (error) {
            alert('업뎃실패')
        }
    }
    const onClose = () => {
        console.log('dd')
    }

    const formatTimeForLocalTime = (time) => {
        // '15:00'와 같은 형식으로 변환
        if (time) {
            const [hours, minutes] = time.split(':');
            return `${hours}:${minutes}:00`; // '15:00:00' 형식
        }
        return null; // 혹은 ''로 처리할 수 있습니다
    };
    // 서버로 데이터 보내기
    // ==================== END ======================== //

    return (
        <div className={`room--edit--admin--container ${roomModalShow && 'open'}`}>

            <div>
                <button type='button' onClick={handelerUpdate}>수정</button>
                <button type='button' onClick={() => roomModalToggle()}>취소</button>
            </div>
            <div className='top--content'>
                <div className='top--box'>
                    <div className='title'>객실명</div>
                    <input
                        name='roomName'
                        value={state.roomName}
                        onChange={handleChange}
                        type='text'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>방 갯수</div>
                    <input
                        name="roomCount"
                        value={state.roomCount}
                        onChange={preventInvalidInput}
                        className='count'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>가격</div>
                    <input
                        name="roomPrice"
                        value={state.roomPrice}
                        onInput={preventInvalidInput}
                        type='text'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>할인율</div>
                    <input
                        name="roomDiscount"
                        value={state.roomDiscount}
                        onChange={preventInvalidInput}
                        type='text'
                        className='discount'
                        maxLength={2}
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>최대인원 수</div>
                    <input
                        name="roomPeopleMax"
                        value={state.roomPeopleMax}
                        onChange={preventInvalidInput}
                        type='text'
                        className='peopleMax'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>인원정보</div>
                    <input
                        name="roomPeopleInfo"
                        value={state.roomPeopleInfo}
                        onChange={handleChange}
                        type='text'
                        className='peopleInfo'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>체크인</div>
                    <input
                        name="roomCheckinTime"
                        value={state.roomCheckinTime}
                        onChange={handleChange}
                        type='time'
                        className='checkinTime'
                    />
                </div>

                <div className='top--box'>
                    <div className='title'>체크아웃</div>
                    <input
                        name="roomCheckoutTime"
                        value={state.roomCheckoutTime}
                        onChange={handleChange}
                        type='time'
                        className='checkoutTime'
                    />
                </div>
            </div>

            <div className='mid--box'>
                <div className='title'>객실 소개</div>
                {introduction.map((loc, index) => (
                    <div className='introduction--box' key={index}>
                        <input
                            key={index}
                            type="text"
                            value={loc}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>


            <div className='mid--box'>
                <div className='title'>시설</div>
                <div className='selected--box'>
                    {amenitiesBtn.map((name, index) => (
                        <input key={index} type='button' className='selected--btn' value={name} name={name} id={name}
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
                                <div className='image' key={index}>
                                    {image.name}
                                    <IoClose className='delete--file' onClick={() => handlerDelImages(image)} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div >
    )
}
