import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Navbar() {

    let auth = useSelector((state) => state.auth);
    let navigate = useNavigate();

    const handlerMypage = () => {
        if (auth.authState) {
            navigate('/mypage')
        } else {
            alert('로그인 후 이용해주세요.')
            navigate('/login')
        }
    }

    return (
        <div className='navbar--container'>
            <div className='navbar--wrap'>
                <Link to="/wishlist" className='link'>
                    <FaRegHeart className='icon' />
                </Link>

                <Link to="/" className='link'>
                    <div className='home'>
                        LS
                    </div>
                </Link>


                <IoPersonSharp className='icon' onClick={handlerMypage} />
            </div>
        </div>
    )
}
