import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import PreviewImg from './PreviewImg';
export default function ReviewModal({ show, onClose, hotelName, userNickname, updateReview, roomName, hotelThumbnail }) {


    const startArray = [1, 2, 3, 4, 5]
    const [reviewRating, setReviewRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [reviewContent, setReviewContent] = useState("");

    // 업로드용 이미지
    const [uploadImg, setUploadImg] = useState([])

    // 이미지 미리보기
    const [previewImg, setPreviewImg] = useState([])

    // 후기 길이
    const [reviewLen, setReviewLen] = useState(0);
    // 후기 경고
    const [contentWarning, setContentWarning] = useState(false)

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

        console.log(uploadImg)
    }

    // 파일 삭제 시 함수
    const handleDeleteImage = (idx) => {
        setPreviewImg(previewImg.filter((_, index) => index !== idx));

        // 업로드할 이미지에서도 삭제
        setUploadImg(uploadImg.filter((_, index) => index !== idx));
    };


    // 후기 텍스트 함수
    const handleSetValue = (e) => {
        const inputValue = e.target.value;

        if (inputValue.trim().length < 10) {
            setContentWarning(true);
        } else {
            setContentWarning(false);
        }


        const { target: { value }, } = e;
        if (value.length > 200) e.target.value = value.substr(0, 200);

        setReviewContent(e.target.value);
        setReviewLen(e.target.value.trim().length)

    };

    // 작성하기 클릭 함수
    const writeClick = () => {
        if (reviewRating === 0) {
            alert('별점을 선택해주세요.')
        } else if (reviewLen < 10) {
            alert('후기는 10자 이상 입력해주세요.')
        } else {
            updateReview(uploadImg, reviewRating, reviewContent.trim())
        }

    }

    useEffect(() => {
        // 모달이 열릴 때마다 상태 초기화
        if (show) {
            setReviewRating(0);
            setReviewContent("");
            setUploadImg([]);
            setPreviewImg([]);
            setContentWarning(false);
            setReviewLen(0);
        }
    }, [show]);

    // 리뷰 쓰기 버튼 클릭 시 모달창 보이도록 설정
    if (!show) return null;



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
                <img src={hotelThumbnail} alt='호텔이미지' />
                <div className='info--wrap'>
                    <div className='info--box'>
                        <span>숙소 정보</span>
                        <span>{hotelName}</span>
                    </div>

                    <div className='info--box'>
                        <span>객실 정보</span>
                        <span>{roomName}</span>
                    </div>

                    <div className='info--box'>
                        <span>작성자명</span>
                        <span>{userNickname}</span>
                    </div>
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
                                    onClick={() => setReviewRating(starNum)}
                                >
                                    <FaStar className={`icon ${starNum <= (hovered || reviewRating) ? 'filled' : 'empty'}`} />
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* 후기 설정 */}
                <div className='review--write--wrap'>
                    <div className='review--len'>({reviewLen}/200)</div>
                    <div className='review--write--box'>
                        <textarea className={`review--write ${contentWarning && 'warning'}`}
                            placeholder='소중한 후기를 남겨주세요'
                            value={reviewContent}
                            onChange={(e) => handleSetValue(e)}
                            maxLength={200}
                        />
                    </div>
                    {contentWarning && <div className='content--warning'>10자 이상 입력해주세요.</div>}
                </div>

                <div className='image--add--wrap'>

                    <div className='preview--image--box'>
                        <PreviewImg images={previewImg} handleDeleteImage={handleDeleteImage} />
                    </div>


                    {/* 리뷰 이미지 추가 */}
                    <div>
                        <div className='image--max-count'>
                            <span>* 최대 10개</span>
                        </div>

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
                            <span>이미지 추가</span>
                        </label>
                    </div>

                </div>
            </div>


            <div className='review--write--btn' onClick={writeClick}>
                <span>작성하기</span>
            </div>
        </div>
    )
}