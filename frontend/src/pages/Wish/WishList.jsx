import React from 'react'
import BackNav from '../../componets/BackNav/BackNav';
import Navbar from '../../componets/Navbar/Navbar';
import WishListComponent from '../../componets/WishList/WishList';

export default function WishList() {


    const hotelList = [
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '3등급', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '2등급', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5, discountPrice: 100000 }
    ];

    return (
        <div className='wishlist--container'>
            <BackNav title={'찜'} />

            <div className='wishlist--card'>
                {hotelList.map((hotel, index) => (
                    <WishListComponent key={index} hotel={hotel} />
                ))}
            </div>


            <Navbar />
        </div>
    )
}
