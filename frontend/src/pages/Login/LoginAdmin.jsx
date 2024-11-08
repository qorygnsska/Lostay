import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { adminLogin } from "../../store/adminSlice";
import { useDispatch, useSelector } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import { GoPersonFill } from "react-icons/go";
import { FaKey } from "react-icons/fa6";

export default function LoginAdmin() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    /////////////////////////////////////////////////////////////////LoginState

    const adminState = useSelector((state) => state.admin.adminState);
    const adminAT = useSelector((state) => state.admin.adminAT)

    useEffect(() => {

        if (adminState !== false && adminAT !== null) {
            alert('이미 로그인 중입니다.');
            navigate("/admin-home");
        }
    }, []);
    /////////////////////////////////////////////////////////////////LoginState


    const [warning, setWarning] = useState(false);
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    const loginHandler = () => {
        if (id.length === 0 || pw.length === 0) {
            setWarning(true)
            return
        }
        Login()
    }

    // 엔터 눌렀을 때
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            loginHandler();
        }
    };

    const idChangeHandler = (e) => {
        setId(e.target.value);
        setWarning(false)
    };


    const pwChangeHandler = (e) => {
        setPw(e.target.value)
        setWarning(false)
    }

    const Login = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/login`, {
                id: id,
                pw: pw,
            },
                {
                    withCredentials: true,
                });
            if (response.status === 200) {
                await axiosAccessToken()
            } else {
                setWarning(true)
            }
        } catch (error) {
            setWarning(true)
        }
    }


    const axiosAccessToken = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/adminReissue/NewAccess`,
                {},
                {
                    withCredentials: true,
                }
            );
            //console.log(response)
            if (response.status === 200) {
                // 액세스 토큰 가져오기
                const accessToken = response.headers["authorization"];
                //console.log(accessToken)
                dispatch(adminLogin({ adminState: true, adminAT: accessToken }));
                navigate("/admin-home", { replace: true });
            } else {
                setWarning(true)
            }
        } catch (error) {
            setWarning(true)
        }
    };


    return (
        <div className='login--admin--container'>
            <div className='login--wrap'>
                <div className='title'>
                    <img src='Logo/logo.png' alt='로고이미지' className='logo' />
                    <div className='title--text'>관리자</div>
                </div>

                <div className='login--box'>
                    <div className='row--box'>
                        <GoPersonFill className='icon' />
                        <input
                            type='text'
                            placeholder='아이디'
                            className='id'
                            value={id}
                            onChange={idChangeHandler}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className='row--box'>
                        <FaKey className='icon' />
                        <input
                            type='password'
                            placeholder='비밀번호'
                            className='password'
                            value={pw}
                            onChange={pwChangeHandler}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    {warning && <div className='warning'>아이디 또는 비밀번호를 잘못 입력했습니다.</div>}
                </div>
                <div className='login--btn--box'>
                    <button type='button' onClick={loginHandler}>로그인</button>
                </div>
            </div>
        </div>
    )
}
