import React, { useEffect, useState } from "react";
import BackNav from "../../../componets/BackNav/BackNav";
import Navbar from "../../../componets/Navbar/Navbar";
import WishListComponent from "../../../componets/MyPage/WishList/WishList";
import { FaRegHeart } from "react-icons/fa";
import useGetWishs from "../../../hooks/wishInfiniteLoading";
import { useInView } from "react-intersection-observer";
import Toast from "../../../componets/Toast/Toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function WishList() {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchNextPage } = useGetWishs();
    const [toast, setToast] = useState(false);
    const [toastText, setToastText] = useState('');

    const { ref, inView } = useInView()

    // 스크롤 초기화
    const queryClient = useQueryClient();

    function handleRefresh() {
        const cachedData = queryClient.getQueryData(['wishs']);

        // 캐시가 있을때만 진행
        if (cachedData) {
            queryClient.resetQueries(['wishs']);
        }
    }

    const user = useSelector((state) => state.user.userState);
    const userAt = useSelector((state) => state.user.userAt)
    const navigate = useNavigate();

    useEffect(() => {
        if (user === false || userAt === null) {
            alert("로그인 후 이용해주세요.");
            navigate("/login", { replace: true });

            return;
        }

        handleRefresh()
    }, [])

    // 무한 스클롤 설정
    useEffect(() => {

        if (inView && hasNextPage && !isFetchNextPage) {
            fetchNextPage()
        }
    }, [inView])


    return (
        <div className="wishlist--container">
            <BackNav title={"찜"} />
            {isLoading ? null : data?.pages[0].totalPage > -1 ? (
                // 찜이 있을 떄
                <div className="wishlist--card">
                    {data?.pages.map((page) =>
                        page.wishList.map((wish, index) => (
                            <WishListComponent key={index} wishList={wish} setToast={setToast} setToastText={setToastText} index={index} />
                        )))}

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
            <h1 ref={ref} style={{ height: '20px', visibility: 'hidden' }}></h1>
            {toast && <Toast setToast={setToast} text={toastText} />}
            <Navbar />
        </div>
    );
}
