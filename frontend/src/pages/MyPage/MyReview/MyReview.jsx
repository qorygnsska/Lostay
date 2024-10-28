import React, { useEffect } from "react";
import BackNav from "../../../componets/BackNav/BackNav";
import Navbar from "../../../componets/Navbar/Navbar";
import MyReviewComponent from "../../../componets/MyPage/MyReview/MyReview";
import { BsChatText } from "react-icons/bs";
import useGetReviews from "../../../hooks/reviewInfiniteLoading";
import { useInView } from "react-intersection-observer";

export default function MyReview() {

    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchNextPage } = useGetReviews();
    // 감지 div
    const { ref, inView } = useInView()

    // 무한 스클롤 설정
    useEffect(() => {

        if (inView && hasNextPage && !isFetchNextPage) {
            fetchNextPage()
        }
    }, [inView])
    console.log(data)

    return (
        <div className="my--review--container">
            <BackNav title="내 리뷰" />
            {console.log(data)}
            <div className="my--review--wrap">
                {/* 작성한 리뷰 개수 */}
                <div className="review--total">
                    <span>
                        작성한 리뷰{" "}
                        <span className="review--total--cnt">
                            {isLoading ? 0 : data.pages[0].totalReview}
                        </span>
                        개
                    </span>
                </div>

                {isLoading ? null : data.pages[0].totalPage > -1 ?
                    data.pages.map((page) =>
                        page.reviewList.map((review, index) => (
                            <MyReviewComponent review={review} key={index} />
                        )))
                    : ( // 리뷰가 없을 때
                        <div className="reviews">
                            <div>
                                <BsChatText className="icon" />
                            </div>

                            <div className="review--none--text">
                                <span>작성한 리뷰가 없습니다.</span>
                                <span>상품 이용 후 소중한 후기를 남겨주세요.</span>
                            </div>
                        </div>
                    )}
            </div>
            <h1 ref={ref} style={{ height: '20px', visibility: 'hidden' }}></h1>
            <Navbar />
        </div>
    );
}
