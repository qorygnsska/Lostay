import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { privateApi } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

export default function WishList({ wishList, setToast, setToastText, index }) {
    const [wishState, setWishState] = useState(true);
    const [cartNo, setCartNo] = useState(wishList.cartNo);
    const navigate = useNavigate();

    const wishToggle = async (event) => {
        event.preventDefault();
        try {
            if (wishState) {
                const response = await privateApi.post(`/cart/delete?cartNo=${cartNo}`); // API 요청
                if (response.status === 200) {
                    setWishState(!wishState)
                    setToast(true)
                    setToastText('찜 해제')
                }
            } else {
                const response = await privateApi.post(`/cart/save?hotelId=${wishList.hotelNo}`); // API 요청
                if (response.status === 200) {

                    setWishState(!wishState)
                    setToast(true)
                    setToastText('찜 추가')

                    setCartNo(response.data.cartNo)
                }
            }

        } catch (error) {
            alert('서버와의 접속이 원할하지 않습니다.')
            navigate("/")
        }
    };

    return (
        <div className={`wishlist--component--container ${index % 2 === 0 ? 'wishlist--border' : ''}`}>
            <Link to={`/roomList/${wishList.hotelNo}`}>
                <div className="wishlist--wrap">
                    <div className="wishlist--img">
                        <img src={`${wishList.hotelThumbnail}`} alt={`hotel`} />
                        <div className="wishlist--icon" onClick={(event) => wishToggle(event)}>
                            {
                                wishState ? <img src={`eventList/icon_favorite_selected.png`} alt="찜" /> : <FaRegHeart className="icon" />
                            }

                        </div>
                    </div>

                    <div className="wishlist--box">
                        <div className="hotel--info">
                            <div>
                                <span>{wishList.hotelRating}</span>
                            </div>

                            <div>
                                <span>{wishList.hotelName}</span>
                            </div>

                            <div className="review--wrap">
                                <div className="review--box">
                                    <FaStar className="star--Icon" />
                                    <span className="review--avg">
                                        <strong>{wishList.reviewRating ? wishList.reviewRating.toLocaleString() : 0}</strong>
                                    </span>
                                </div>
                                <span className="totalReviewCount">{wishList.totalReviewCount}명 평가</span>
                            </div>
                        </div>

                        <div className="hotel--price--wrap">
                            {wishList.discount !== 0 ? (
                                <div className="hotel--discount--price--wrap">
                                    <span className="discount">{wishList.roomDiscount}%</span>
                                    <span className="roomDcPrice">{wishList.roomDcPrice.toLocaleString()}원</span>
                                </div>
                            ) : null}
                            <strong>{wishList.roomPrice.toLocaleString()}원~</strong>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    );
}