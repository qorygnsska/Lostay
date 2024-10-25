import React from "react";
import { FaStar } from "react-icons/fa6";
import { privateApi } from "../../../api/api";
import { Link } from "react-router-dom";

export default function WishList({ wishList, wishCancle }) {
    return (
        <div className="wishlist--component--container">
            <Link to="/hotellist">
                <div className="wishlist--wrap">
                    <div className="wishlist--img">
                        <img src={`${wishList.hotelThumbnail}`} alt={`hotel`} />
                        <div className="wishlist--icon" onClick={(event) => wishCancle(event, wishList.cartNo)}>
                            <img src={`eventList/icon_favorite_selected.png`} alt="찜" />
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
                            <strong>{wishList.roomPrice}원~</strong>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
