import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Navbar() {
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

                <Link to="/mypage" className='link'>
                    <IoPersonSharp className='icon' />
                </Link>
            </div>
        </div>
    )
}
