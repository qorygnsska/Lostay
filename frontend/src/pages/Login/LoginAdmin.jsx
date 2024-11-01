import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { adminLogin } from "../../store/adminSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin() {
    const [username, setUsername] = useState('1234');
    const [password, setPassword] = useState('1234');
    const dispatch = useDispatch();
    let navigate = useNavigate();


    // useEffect(() => {
    //     const Login = async () => {
    //         try {
    //             const response = await axios.post('http://localhost:9090/login-admin', {
    //                 id: username,
    //                 pw: password,
    //             },
    //                 {
    //                     withCredentials: true,
    //                 });
    //             if (response.status === 200) {
    //                 console.log(response)
    //                 axiosAccessToken()
    //             }
    //         } catch (error) {
    //             console.error('Login failed:', error);
    //             alert('Login failed: ' + (error.response?.data || 'Unknown error'));
    //         }
    //     }

    //     Login()
    // }, [Login()])

    const axiosAccessToken = async () => {
        try {
            const response = await axios.post(
                "http://localhost:9090/adminNewAccess",
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log(response);

                // 액세스 토큰 가져오기
                const accessToken = response.headers["authorization"];
                dispatch(adminLogin({ adminState: true, aT: accessToken }));
                navigate("/admin-home");

            } else {

            }
        } catch (error) {

        }
    };

    return (
        <div className='login--admin--container'>
            <div className='login--wrap'>

                <img src='Logo/logo.png' alt='로고이미지' className='logo' />



                <div className='login--box'>

                </div>
            </div>
        </div>
    )
}
