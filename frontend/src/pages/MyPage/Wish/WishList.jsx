import React, { useEffect, useState } from "react";
import BackNav from "../../../componets/BackNav/BackNav";
import Navbar from "../../../componets/Navbar/Navbar";
import WishListComponent from "../../../componets/MyPage/WishList/WishList";
import { FaRegHeart } from "react-icons/fa";
import { privateApi } from "../../../api/api";

export default function WishList() {

    const [page, setPage] = useState(0);
    const [wishList, setWishList] = useState([]);

    const getData = async () => {

        try {
            const response = await privateApi.get(`/mypageCartList?page=${page}`); // API 요청
            console.log(response.data)
            setWishList(response.data)
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, [page]);

    return (
        <div className="wishlist--container">
            <BackNav title={"찜"} />

            {wishList.length ? (
                // 찜이 있을 떄
                <div className="wishlist--card">
                    {wishList.map((data, index) => (
                        <WishListComponent key={index} wishList={data} />
                    ))}
                </div>
            ) : (
                // 찜이 없을 때
                <div className="wishlist--blank">
                    <FaRegHeart className="icon" />
                    <div className="wishlist--blank--text">
                        <span>찜한 숙소가 없습니다.</span>
                        <span>마음에 드는 상품을 찜해주세요.</span>
                    </div>
                </div>
            )}

            <Navbar />
        </div>
    );
}
