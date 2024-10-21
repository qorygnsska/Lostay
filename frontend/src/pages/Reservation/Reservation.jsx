import React, { useState } from "react";
import BackNav from "../../componets/BackNav/BackNav";
import Navbar from "../../componets/Navbar/Navbar";
import { MdOutlineCheckBox } from "react-icons/md";
import PayType from "../../componets/Reservation/PayType";
import AgreeInfo from "../../componets/Reservation/AgreeInfo";
import AgreeChkInfo from "../../componets/Reservation/AgreeChkInfo";
import { BsExclamationCircle } from "react-icons/bs";

const reinfo = {
    hotelName: "서울신라호텔",
    hotelImage: "2b9ba01a5cfcd32ac752258732a5a669.webp",
    roomName: "[오픈런] F&B 크레딧 10만원+신라베이키링 디럭스 더블",
    checkInDay: "11.18 (월)",
    checkOutDay: "11.19 (화)",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    defaultPerson: "2인기준, 최대 3인(유료)",
    userName: "홍길동",
    userPhone: "010-9920-2121",
    userPoint: 1000,
    roomOriPrice: 496220,
};

const paymentMethods = [
    { id: 1, name: "카카오페이", imageUrl: "kakaoPay.png", sale: 5 },
    { id: 2, name: "토스페이", imageUrl: "tossPay.png", sale: 3 },
    { id: 3, name: "네이버페이", imageUrl: "naverPay.png", sale: 6 },
    { id: 4, name: "페이코페이", imageUrl: "paycoPay.png", sale: 7 },
    { id: 5, name: "신용카드", sale: 0 },
];

const agreeInfo = [
    { id: 1, title: "현장결제", content: "추가인원 비용등의 현장결제 발생 상품을 확인하세요." },
    { id: 2, title: "취소불가 및 환불", content: "예약취소는 체크인 하루 전 까지만 가능하며, 환불 금액은 100% 환불됩니다." },
    { id: 3, title: "미성년자 및 법정대리인 필수", content: "미성년자는 법정대리인 동행 없이 투숙이 불가능합니다." },
];

const agreeChkInfo = [
    { id: 1, title: "[필수] 만 14세 이상 이용 동의" },
    {
        id: 2,
        title: "[필수] 이용규칙",
        content: [
            {
                id: 1,
                text: "각 숙박시설의 규정(규칙 및 약관 등)을 준수해야 합니다. 숙박시설 규정을 위반 시 입실 불가, 퇴실 조치, 추가요금 등이 발생할 수 있으며, 이에 대한 모든 책임은 예약 및 이용 고객님에게 있으므로 숙박 시설의 이용 규칙과 시설 현황을 반드시 확인 바랍니다.",
            },
            { id: 2, text: "규정 내 이용 가능 인원을 초과할 경우, 이용 불가 통보 또는 초과 인원에 대한 추가 요금이 발생할 수 있으며, 이에 대한 모든 책임은 예약 및 이용 고객님에게 있습니다." },
            {
                id: 3,
                text: '모든 숙박시설의 예약은 실시간으로 이루어지기 때문에, "예약과 동시에 확정"이 되더라도 over booking(오버부킹)을 비롯한 숙박시설 사정에 따라 "예약 대기" 또는 "예약취소" 상태로 변경될 수 있으며, 결제하신 금액은 자동 환불 처리됩니다.',
            },
            {
                id: 4,
                text: "미성년자 투숙 시 청소년보호법 등 관계 법령에 따라 미성년자(만 19세 미만 청소년)의 경우 혼숙이 금지되며, 법정대리인 동행 없이 혼숙이 불가한 점 반드시 유의하여 주시길 바랍니다. 또한 해당 사유로 인하여 현장에서 입실이 불가할 경우 취소 및 환불이 불가합니다.",
            },
            {
                id: 5,
                text: "각 숙박시설 정보는 예약을 위한 참고자료입니다. 숙박시설 내 자체 변동이나 기타 사유로 인해 실제와 차이가 있을 수 있으며, 이에 대한 (주)로스테이플랫폼은 책임을 지지 않습니다.",
            },
            {
                id: 6,
                text: "객실배정에 따른 요청사항(금연룸,고충 등)은 숙박시설에 전달되나, 최종 반영 여부는 예약하신 숙박시설의 결정사항이므로 (주)로스테이플랫폼에서 보장할 수 없는 사항임을 유의하여 주시기 바랍니다.",
            },
        ],
    },
    { id: 3, title: "[필수] 취소 및 환불 규칙" },
];

export default function Reservation() {
    const [useAllPoints, setUseAllPoints] = useState(false); // 포인트 모두 사용
    const [inputPoints, setInputPoints] = useState(0); // 포인트 직접 입력
    const [totalPrice, setTotalPrice] = useState(reinfo.roomOriPrice); // 총 결제 가격
    const [payType, setpayType] = useState(null); // 결제 수단
    const [salePrice, setSalePrice] = useState(0); // 할인 금액
    const [checkItems, setCheckItems] = useState([]); // 체크된 동의 담을 배열

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems((prev) => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = agreeChkInfo.map((el) => el.id);
            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    };

    // 포인트 모두사용 했는지
    const handleCheckboxChange = () => {
        const newUseAllPoints = !useAllPoints;
        setUseAllPoints(newUseAllPoints);

        const points = newUseAllPoints ? reinfo.userPoint : "";
        setInputPoints(points);
        updateTotalPrice(points, payType?.sale);
    };

    // 포인트 직접 입력
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/,/g, ""); // 입력값에서 쉼표 제거

        if (useAllPoints) {
            setUseAllPoints(false);
        }
        // 입력값이 숫자이고, 범위를 초과하지 않는지 확인
        if (/^\d*$/.test(value) && (value === "" || (parseInt(value, 10) <= reinfo.userPoint && parseInt(value, 10) <= totalPrice))) {
            setInputPoints(value);
            updateTotalPrice(value, payType?.sale);
        }
    };

    // 결제 수단 선택 시 할인
    const handlePayTypeChange = (method) => {
        setpayType(method);
        updateTotalPrice(inputPoints, method.sale);
    };

    // 총 결제금액 계산
    const updateTotalPrice = (points, sale = 0) => {
        const pointsToUse = parseInt(points, 10) || 0;
        const discountAmount = Math.floor((reinfo.roomOriPrice * sale) / 100); // sale을 비율로 계산
        const discountedPrice = reinfo.roomOriPrice - discountAmount;
        setSalePrice(discountAmount);
        setTotalPrice(discountedPrice - pointsToUse);
    };

    // 숫자 포맷팅
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="re--container">
            <BackNav title="객실 예약" />

            <div className="re--wrap">
                {/* 예약할 호텔 정보 */}
                <div className="hotel--info">
                    <div className="hotel--title">
                        <span>{reinfo.hotelName}</span>
                    </div>

                    <img src={`HotelList/${reinfo.hotelImage}`} alt="호텔 이미지" />

                    <div className="hotel--info--box">
                        <span>객실</span>
                        <span>{reinfo.roomName}</span>
                    </div>

                    <div className="hotel--info--box">
                        <span>일정</span>
                        <span>
                            {reinfo.checkInDay} {reinfo.checkInTime} ~ {reinfo.checkOutDay} {reinfo.checkOutTime}
                        </span>
                    </div>

                    <div className="hotel--info--box">
                        <span>기준인원</span>
                        <span>{reinfo.defaultPerson}</span>
                    </div>
                </div>

                {/* 사용자 정보 */}
                <div className="profile--info">
                    <span className="section--title">예약자 정보</span>
                    <div className="profile--box">
                        <span>예약자 이름</span>
                        <span>{reinfo.userName}</span>
                    </div>

                    <div className="profile--box">
                        <span>휴대폰 번호</span>
                        <span>{reinfo.userPhone}</span>
                    </div>
                </div>

                {/* 결제 수단 */}
                <div className="payType--wrap">
                    <div className="payType--title--box">
                        <span className="section--title">결제수단</span>
                        <BsExclamationCircle className="pay--sale--icon" />
                        <div className="sale--info">
                            {paymentMethods.map((method) =>
                                method.sale > 0 ? (
                                    <div>
                                        {method.name} : {method.sale}%
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>
                    <div>
                        <ul className="payType--box">
                            {paymentMethods.map((method) => (
                                <li className={`payType ${payType?.id === method.id ? "selected" : ""}`} key={method.id} onClick={() => handlePayTypeChange(method)}>
                                    <PayType method={method} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 결제 정보 */}
                <div className="pay--info">
                    <span className="section--title">결제 정보</span>

                    <div className="pay--box">
                        <span>상품 금액</span>
                        <span>{reinfo.roomOriPrice.toLocaleString()}원</span>
                    </div>

                    <div className="pay--box">
                        <span>할인 금액</span>
                        <div className="pay--discount--box">
                            {payType?.sale > 0 ? (
                                <span className="sale--info">
                                    ({payType.name} : {payType.sale}%)
                                </span>
                            ) : null}
                            <span>{salePrice.toLocaleString()}원</span>
                        </div>
                    </div>

                    <div className="pay--box">
                        <span>포인트</span>
                        <div className="point--box">
                            <div className="user--point--box">
                                <span>보유 포인트 : {reinfo.userPoint}p</span>
                                <div>
                                    <input type="checkbox" id="useAllPoints" checked={useAllPoints} onChange={handleCheckboxChange} />
                                    <label htmlFor="useAllPoints">
                                        <span>
                                            <MdOutlineCheckBox className={`icon ${useAllPoints ? "checked" : "unchecked"}`} />
                                            모두 사용
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="use--point--box">
                            <span>-</span>
                            <div>
                                <input type="text" value={inputPoints ? formatNumber(inputPoints) : ""} onChange={handleInputChange} />
                                <span>원</span>
                            </div>
                        </div>
                    </div>

                    <hr type="dashed" className="dash--line"></hr>

                    <div className="totalpay--box">
                        <span>총 결제 금액</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                </div>

                {/* 동의화면 */}
                <div className="agree--wrap">
                    <AgreeInfo agreeInfo={agreeInfo} />
                    <AgreeChkInfo agreeChkInfo={agreeChkInfo} checkItems={checkItems} handleSingleCheck={handleSingleCheck} handleAllCheck={handleAllCheck} />
                    {/* 결제버튼 */}
                    <button disabled={checkItems.length !== agreeChkInfo.length}>{totalPrice.toLocaleString()}원 결제하기</button>
                </div>
            </div>
            <Navbar />
        </div>
    );
}
