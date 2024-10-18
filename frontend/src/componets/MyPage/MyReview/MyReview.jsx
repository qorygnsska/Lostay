import React from 'react'
import { FaStar } from "react-icons/fa6";

export default function MyReview({ reviewData }) {

    const ratingArray = [1, 2, 3, 4, 5]

    return (
        <div className='myreview--component--container'>
            <div className='myreview--wrap'>
                <div className='myreview--info'>
                    <div className='info--title'>
                        <span>{reviewData.hotelName}</span>
                    </div>

                    <div className='info--date'>
                        <span>{reviewData.date}</span>
                    </div>
                </div>

                <div className='myreview--rating'>
                    {
                        ratingArray.map((rate, idx) => {
                            return reviewData.rate >= rate ? <FaStar key={idx} className='icon--fill' /> : <FaStar key={idx} className='icon--empty' />
                        })
                    }
                </div>

                <div className='myreview--content'>
                    <p>{reviewData.content}</p>
                </div>


                {
                    reviewData.images.length > 0 ? (
                        <div className='myreview--image--wrap'>
                            {
                                reviewData.images.map((img, idx) => (
                                    <div className='myreview--image' key={idx}>
                                        <img src={`eventList/${img}`} alt='리뷰 이미지' />
                                    </div>
                                ))}
                        </div>) : null
                }
            </div>
        </div >
    )
}
