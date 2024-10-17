import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import PreviewImg from './PreviewImg';
export default function ReviewModal({ isOpen, onClose, hotelName, userNickname }) {


    const startArray = [1, 2, 3, 4, 5]
    const [rating, setRating] = useState(startArray[0]);
    const [hovered, setHovered] = useState(0);
    const [textValue, setTextValue] = useState("");

    // 업로드용 이미지
    const [uploadImg, setUploadImg] = useState([])

    // 이미지 미리보기
    const [previewImg, setPreviewImg] = useState([])

    // 파일 업로드 시 함수
    const uploadFiles = (e) => {

        let files = Array.from(e.target.files);

        if (files.length + previewImg.length > 10) {
            alert("이미지는 최대 10개까지 추가할 수 있습니다.");
            return;
        }

        setUploadImg(Array.from(files));

        let fileUrl = [];
        files.forEach((file) => {
            let fileRead = new FileReader();
            fileRead.onload = () => {
                fileUrl.push(fileRead.result);
                if (fileUrl.length === files.length) { // 모든 파일이 로드된 경우
                    setPreviewImg((prev) => [...prev, ...fileUrl]);
                }
            };
            fileRead.readAsDataURL(file);
        });
    }

    // 파일 삭제 시 함수
    const handleDeleteImage = (idx) => {
        setPreviewImg(previewImg.filter((_, index) => index !== idx));
    };

    // 후기 텍스트 함수
    const handleSetValue = (e) => {
        setTextValue(e.target.value);
    };

    // 리뷰 쓰기 버튼 클릭 시 모달창 보이도록 설정
    if (!isOpen) return null;

    return (
        <div className='review--modal--container'>

            <div className="cancle--modal">

                <div className="none"></div>
                <span>리뷰 작성</span>
                <button onClick={onClose}>
                    <IoClose className="icon" />
                </button>

            </div>

            <div className="booking--info">
                <div className='info--box'>
                    <span>숙소 정보</span>
                    <span>{hotelName}</span>
                </div>

                <div className='info--box'>
                    <span>작성자명</span>
                    <span>{userNickname}</span>
                </div>
            </div>

            <div className='review--content--wrap'>
                <div className='review--rating--wrap'>
                    <div>
                        <span>이곳에서의 경험은 어떠셨어요?</span>
                    </div>

                    {/* 별점 설정 */}
                    <div className='rating--btn'>
                        {
                            startArray.map((starNum) => (
                                <button key={starNum} className='star--btn'
                                    onMouseEnter={() => setHovered(starNum)}
                                    onMouseLeave={() => setHovered(0)}
                                    onClick={() => setRating(starNum)}
                                >
                                    <FaStar className={`icon ${starNum <= (hovered || rating) ? 'filled' : 'empty'}`} />
                                </button>
                            ))
                        }
                    </div>
                </div>

                <div className='review--write--wrap'>
                    <div>
                        <textarea className='review--write'
                            placeholder='소중한 후기를 남겨주세요'
                            value={textValue}
                            onChange={(e) => handleSetValue(e)}
                        />
                    </div>
                </div>

                <div className='image--add--wrap'>

                    <div className='preview--image--box'>
                        {
                            previewImg.map((img, idx) => (
                                <PreviewImg key={idx} img={img} handleDeleteImage={handleDeleteImage} idx={idx} />))
                        }
                    </div>


                    {/* 리뷰 이미지 추가 */}
                    <label
                        htmlFor='file-selector'
                        className='file--selector--btn'
                    >
                        <input
                            id="file-selector"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={uploadFiles}
                            multiple />
                        <span>이미지 추가 (최대 10개)</span>
                    </label>
                </div>
            </div>


            <div className='review--write--btn'>
                <span>작성하기</span>
            </div>
        </div>
    )
}