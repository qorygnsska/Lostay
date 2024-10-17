import React from 'react'
import { IoClose } from "react-icons/io5";

export default function PreviewImg({ img, handleDeleteImage, idx }) {

    // 이미지 미리보기
    return (
        <div className='preview--img--container'>
            <div className='preview--img--box'>
                <img src={img} alt='업로드 이미지' />
                <div className='icon--box' onClick={() => handleDeleteImage(idx)}>
                    <IoClose className='icon' />
                </div>
            </div>
        </div>
    )
}

