import React from 'react'

export default function Footer() {
    return (
        <div className='footer--container'>
            <h1>로스테이</h1>
            <div className='footer-info'>
                <p>(주)로스테이컴퍼니 | 대표이사 : 신재호</p>
                <p>주소 : 서울특별시 서초구 서초대로 74길 45, 엔데버 빌딩 3층</p>
                <p>전자우편주소 : lostay@sst.com | 통신판매번호 : 2017-서울강남-01779</p>
                <p>호스팅 서비스제공자의 상호 표시 : (주)로스테이컴퍼니</p>
                <p>(주)로스테이 컴퍼니는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
            </div>

            {/* <div className='footer--service--btn'>
                <a href='example.com'>
                    <button>
                        서비스 이용 약관
                    </button>
                </a>

                <a href='example.com'>
                    <button>
                        전자금융거래 이용 약관
                    </button>
                </a>

                <a href='example.com'>
                    <button>
                        전자금융거래 이용자 주의사항
                    </button>
                </a>
            </div> */}

            <div className='footer--company'>
                <p>Copyright Lostay COMPANY Crop. All rights reserved.</p>
            </div>
        </div>


    )
}
