import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuNavigation } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";

export default function Navbar() {
    const user = useSelector((state) => state.user.userState);
    const userAt = useSelector((state) => state.user.userAt)
    const navigate = useNavigate();

    const handlerMypage = () => {
        if (user === false || userAt === null) {
            alert("로그인 후 이용해주세요.");
            navigate("/login", { replace: true });

            return;
        }

        navigate("/mypage");
    };

    return (
        <div className="navbar--container">
            <div className="navbar--wrap">
                <Link to="/" className="link">
                    <IoHomeOutline className="icon" />
                </Link>

                <Link to="/hotelMap" className="link">
                    <LuNavigation className="icon"/>
                </Link>

                <Link to="/wishlist" className="link">
                    <FaRegHeart className="icon" />
                </Link>



                <IoPersonSharp className="icon" onClick={handlerMypage} />


            </div>
        </div>
    );
}
