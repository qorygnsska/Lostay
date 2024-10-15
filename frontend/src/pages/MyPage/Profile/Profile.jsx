import React, { useRef, useState } from 'react'
import BackNav from '../../../componets/BackNav/BackNav';
import Navbar from '../../../componets/Navbar/Navbar';
import { FaPencil } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

export default function Profile() {

    const data = { nickname: '루메이로05', email: 'dny091@naver.com', phone: '010-4715-5243' }

    const [nicknameEdit, setNicknameEidt] = useState(false);
    const nicknameInputRef = useRef(null);

    const [phoneEdit, setPhoneEidt] = useState(false);
    const phoneInputRef = useRef(null);

    const [nickname, setNickname] = useState(data.nickname);
    const [phone, setPhone] = useState(data.phone)

    const handleNicknameEdit = () => {
        setNicknameEidt(!nicknameEdit);
        setPhoneEidt(false);
        if (!nicknameEdit) {
            nicknameInputRef.current.focus(); // input에 포커스 설정
        }
    };

    const handlePhoneEdit = () => {
        setPhoneEidt(!phoneEdit);
        setNicknameEidt(false);
        if (!phoneEdit) {
            phoneInputRef.current.focus(); // input에 포커스 설정
        }
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const formatPhoneNumber = (value) => {
        // 하이픈 자동 추가 함수
        const cleaned = value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
        const match = cleaned.match(/(\d{3})(\d{3,4})(\d{4})/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`; // 포맷팅된 전화번호 반환
        }
        return value; // 포맷팅할 수 없으면 원래 값 반환
    };

    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
    };

    return (
        <div className='profile--container'>
            <div>
                <BackNav title='내 정보 관리' />
            </div>

            <div className='profile--wrap'>
                <div className='profile--box'>
                    <p className='profile--title'>개인정보</p>
                    <div className='profile'>
                        <div className='profile--child'>
                            <div className='profile--child--title'><span>닉네임</span></div>
                            <div className='profile--edit'>
                                <input ref={nicknameInputRef} value={nickname} onChange={handleNicknameChange} readOnly={!nicknameEdit} />
                                <FaPencil className='icon focus' onClick={!nicknameEdit ? handleNicknameEdit : null} />
                            </div>
                        </div>

                        <div className={nicknameEdit ? 'nickname--edit--btn focus' : 'hide'} onClick={handleNicknameEdit}>
                            확인
                        </div>

                        <div className='profile--child'>
                            <div className='profile--child--title'><span>이메일</span></div>
                            <span>{data.email}</span>
                        </div>

                        <div className='profile--child'>
                            <div className='profile--child--title'><span>휴대폰번호</span></div>
                            <div className='profile--edit'>
                                <input ref={phoneInputRef} value={phone} onChange={handlePhoneChange} readOnly={!phoneEdit} />
                                <FaPencil className='icon focus' onClick={!phoneEdit ? handlePhoneEdit : null} />
                            </div>
                        </div>

                        <div className={phoneEdit ? 'phone--edit--btn focus' : 'hide'} onClick={handlePhoneEdit}>
                            확인
                        </div>
                    </div>

                    <div className='profile--delete'>
                        <p>회원탈퇴</p>
                        <FaChevronRight className='icon' />
                    </div>
                </div>
            </div>
            <div>
                <Navbar />
            </div>
        </div>
    )
}
