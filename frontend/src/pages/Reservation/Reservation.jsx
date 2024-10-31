import React, { useEffect, useRef, useState } from "react";
import BackNav from "../../componets/BackNav/BackNav";
import Navbar from "../../componets/Navbar/Navbar";
import { MdOutlineCheckBox } from "react-icons/md";
import PayType from "../../componets/Reservation/PayType";
import AgreeInfo from "../../componets/Reservation/AgreeInfo";
import AgreeChkInfo from "../../componets/Reservation/AgreeChkInfo";
import { BsExclamationCircle } from "react-icons/bs";
import axios from "axios";
import { privateApi } from "../../api/api";


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

    const [hotelRoomInfo, setHotelRoomInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    // 첫 화면 데이터 가져오기
    useEffect(() => {
        const getData = async () => {

            try {
                const [hotelRoomInfoResp, userInfoResp] = await Promise.all([
                    privateApi.get('/HotelRoomInfo', {
                        params: {
                            roomNo: 1,
                            checkInDate: "2024-11-05", // 'YYYY-MM-DD' 형식의 날짜 전달
                            checkOutDate: "2024-11-06",
                        },
                    }),
                    privateApi.get('/UserInfo'),
                ]);

                console.log(hotelRoomInfoResp.data)
                console.log(userInfoResp.data)
                setHotelRoomInfo(hotelRoomInfoResp.data)
                setUserInfo(userInfoResp.data)


            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, [])


    // 예약자 정보
    const [name, setName] = useState('');
    const nameInputRef = useRef(null);
    const [nameWarning, setNameWarning] = useState(false);


    const getByteLength = (str) => {
        let byteCount = 0;
        for (let char of str) {
            byteCount += /[가-힣]/.test(char) ? 3 : 1; // 한글은 2바이트, 영어는 1바이트
        }
        return byteCount;
    };

    const checkNameValidity = (inputValue) => {
        const byteLength = getByteLength(inputValue); // 바이트 길이 계산

        if (inputValue.length === 0) return true; // 아무것도 안 칠 경우
        else if (/^[가-힣]*$/.test(inputValue)) { // 한글만
            if (byteLength < 6) return true; // 6바이트 미만
            return false; // 6바이트 이상
        } else if (/^[a-zA-Z]*$/.test(inputValue)) { // 영어만
            if (byteLength < 2) return true; // 2바이트 미만
            return false; // 2바이트 이상
        } else if (/^[가-힣a-zA-Z]*$/.test(inputValue)) { // 한글 + 영어
            if (byteLength < 4) return true; // 4바이트 미만
            return false; // 4바이트 이상
        } else if (byteLength < 2) {
            return true;
        }
        return false; // 기타 경우
    };


    // 예약자 수정
    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        const isValid = checkNameValidity(inputValue);

        setNameWarning(isValid);

        const { target: { value }, } = e;
        if (value.length > 15) e.target.value = value.substr(0, 15);
        setName(e.target.value);
    }
    // 휴대폰번호 수정

    // 입력된 휴대폰 번호
    const [phone, setPhone] = useState('010-9920-2102');

    // 변경 전 휴대폰 번호
    const [prePhone, setPrePhone] = useState('010-9920-2101');

    // 휴대폰 수정 On/ Off
    const [phoneEdit, setPhoneEidt] = useState(false);

    // 휴대폰 Input
    const phoneInputRef = useRef(null);

    // 휴대폰 번호 수정 안했을 시 활성화
    const [isVerifiedPhone, setVerifiedPhone] = useState(false);

    // 인증 실패 시 활성화
    const [isVerified, setIsVerified] = useState(false)

    // 보여줄 메시지
    const [verificationMessage, setVerificationMessage] = useState('')

    // 첫 인증번호 보냈는지 확인
    const [verificationSent, setVerificationSent] = useState(false);

    // 인증번호 Input
    const verificationCodeRef = useRef(null);

    // 입력된 인증 번호
    const [verificationCode, setVerificationCode] = useState('');

    // 인증번호 확인 버튼 On/Off
    const [isVerificationBtnEn, setIsVerificationBtnEn] = useState(true)

    // default 타이머 시간
    const [timer, setTimer] = useState(180);

    // 타이머 시작 On/Off
    const [isStartTimer, setIsStartTimer] = useState(false);

    // 서버에서 받은 랜덤 6자리
    const [serverCode, setServerCode] = useState("")


    //타이머 함수
    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // 인증번호 전송 버튼 활성화 여부
    const isButtonEnabled = phone.replace(/-/g, "").length === 10 || phone.replace(/-/g, "").length === 11;

    // 인증번호 확인 버튼 활성화
    const isVerificationCodeBtnEnabled = verificationCode.length === 6 && isVerificationBtnEn;

    // 휴대폰 번호 포맷
    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
        let formatted = "";

        // 기본 포맷
        if (cleaned.length === 10) {
            // 10자리 포맷: 010-232-2323
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        } else if (cleaned.length === 11) {
            // 11자리 포맷: 010-2323-2323
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        } else {
            // 기본 포맷
            if (cleaned.length <= 3) {
                formatted = cleaned; // 첫 세 자리까지
            } else if (cleaned.length <= 6) {
                formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`; // 3자리-나머지
            } else if (cleaned.length < 11) {
                formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`; // 3자리-3자리-1자리
            }
        }

        return formatted; // 포맷팅된 전화번호 반환
    }

    useEffect(() => {
        if (userInfo) {
            setPhone(userInfo.userPhone || '')
            setPrePhone(userInfo.userPhone || '')
        }
    }, [userInfo]);

    // 휴대폰번호 수정 버튼
    const handlePhoneEdit = () => {
        setPhoneEidt(!phoneEdit);
        if (!phoneEdit) {
            phoneInputRef.current.focus();
        }
    };

    // 휴대폰번호 취소 버튼
    const handlePhoneEditCancle = () => {
        setPhoneEidt(!phoneEdit);
        setVerifiedPhone(true);
        setIsVerified(false);
        setVerificationSent(false);
        setVerificationCode('');
        setIsVerificationBtnEn(true);
        setTimer(180);
        setServerCode('');
        setPhone(prePhone)
    };

    // 휴대폰번호 수정된 값
    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
        setVerifiedPhone(true);
    };



    // 인증번호 전송 함수
    const sendVerification = () => {

        if (phone === prePhone) {
            setVerifiedPhone(false);
            setVerificationMessage("이미 등록된 번호입니다.");
        } else {
            setVerificationMessage("")
            setVerificationSent(true);
            setIsStartTimer(true);

            // 인증번호 전송하는 로직
            // 서버에 보내는 코드
            postPhoneNum(phone);
        }

    };

    // 인증번호 재전송 함수
    const resendVerification = () => {


        if (phone === prePhone) {
            setVerifiedPhone(false);
            setVerificationMessage("이미 등록된 번호입니다.");
        } else {
            setVerificationMessage("");
            setTimer(180);
            setIsStartTimer(true);
            setVerifiedPhone(true)
            setIsVerified(true);
            setIsVerificationBtnEn(true);
            setVerificationCode('');

            // 인증번호 전송하는 로직
            // 서버에 보내는 코드
            postPhoneNum(phone);
        }
    };

    // 인증번호 확인
    const verifyCode = () => {
        setIsStartTimer(false);
        setIsVerificationBtnEn(false);

        if (verificationCode === serverCode.certificationCode && timer > 0) {
            setPhoneEidt(!phoneEdit);
            setVerifiedPhone(true);
            setIsVerified(false);
            setVerificationSent(false);
            setVerificationCode('');
            setIsVerificationBtnEn(true);
            setTimer(180);
            setServerCode('');
            postPhoneNumSave(phone)
            setPrePhone(phone)
            setPhone(phone);
        } else {
            setIsVerified(false);
            setVerificationMessage("잘못된 인증번호입니다.");
        }
    };


    // 타이머
    useEffect(() => {
        let interval;

        if (isStartTimer) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setIsStartTimer(false);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [isStartTimer]);

    // 인증번호 발송
    const postPhoneNum = async (phonenum) => {

        try {
            const response = await axios.post(`http://localhost:9090/loginPhone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };


    // 전화번호 저장
    const postPhoneNumSave = async (phonenum) => {

        try {
            const response = await privateApi.post(`http://localhost:9090/mypageUserInfo/phone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    // 결제 (아임포트)
    const { IMP } = window;
    IMP.init('imp67745024');

    const requestPay = (pg, merchant_uid) => {
        IMP.request_pay({
            pg: pg,
            merchant_uid: merchant_uid,
            name: "주문명:결제테스트",
            amount: totalPrice,
            buyer_name: "구매자이름",
            buyer_tel: "010-1234-5678",

        }, (rsp) => {
            if (rsp.success) { // 프론트에서 결제가 완료되면
                console.log(rsp.data)
                privateApi.post(`http://localhost:9090/api/v1/order/payment/${merchant_uid}`, {
                    imp_uid: rsp.imp_uid,            // 결제 고유번호
                    merchant_uid: rsp.merchant_uid,   // 주문번호
                    amount: rsp.paid_amount
                })
                    .then((res) => {
                        // 결제완료 
                    })
                    .catch((error) => {
                        // 에러발생시
                    });
            } else {
                // 에러발생시
            }
        });
    }

    const requestPayType = [
        { name: "카카오페이", pg: "kakaopay.TC0ONETIME" },
        { name: "토스페이", pg: "tosspay.tosstest" },
        { name: "페이코페이", pg: "payco.PARTNERTEST" },
        { name: "신용카드", pg: "settle.portone1" }
    ]

    const paymentClick = () => {
        // 이름 작성 여뷰

        if (name.length === 0 || nameWarning === true) {
            alert('이름을 입력해주세요.')
            return;
        } else if (phoneEdit) {
            alert('전화번호를 저장해주세요.')
            return;
        } else if (payType === null) {
            alert('결제수단을 선택해주세요.')
            return;
        }

        const merchant_uid = "merchant_" + new Date().getTime()
        privateApi.post('http://localhost:9090/Payment/Before', {
            point: Number(inputPoint),
            roomNo: hotelRoomInfo.roomNo,
            disNo: payType.disNo,
            merchant_uid: merchant_uid,
        })
            .then((res) => {
                console.log("res:", res)
                requestPay(payType.disPg, merchant_uid)
            })
            .catch((error) => {
                alert("결제에 실패했습니다.")
            });
    }

    const [useAllPoints, setUseAllPoints] = useState(false); // 포인트 모두 사용
    const [inputPoint, setInputPoint] = useState(0); // 포인트 직접 입력
    const [totalPrice, setTotalPrice] = useState(hotelRoomInfo?.roomPrice); // 총 결제 가격
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

        const point = newUseAllPoints ? hotelRoomInfo.roomPrice - salePrice : 0;
        setInputPoint(point);
        updateTotalPrice(point, payType?.sale);
    };

    // 포인트 직접 입력
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/,/g, ""); // 입력값에서 쉼표 제거

        if (useAllPoints) {
            setUseAllPoints(false);
        }
        // 입력값이 숫자이고, 범위를 초과하지 않는지 확인
        if (/^\d*$/.test(value) && (value === "" || (parseInt(value, 10) <= userInfo?.userPoint && parseInt(value, 10) <= hotelRoomInfo.roomPrice - salePrice))) {
            setInputPoint(value);
            updateTotalPrice(value, payType?.disRate);
        }
    };

    // 결제 수단 선택 시 할인
    const handlePayTypeChange = (dis) => {
        setpayType(dis);
        updateTotalPrice(inputPoint, dis.disRate);
    };

    // 총 결제금액 계산
    const updateTotalPrice = (points, sale = 0) => {
        const pointsToUse = parseInt(points, 10) || 0;
        const discountAmount = Math.floor((hotelRoomInfo.roomPrice * sale) / 100); // sale을 비율로 계산
        const discountedPrice = hotelRoomInfo.roomPrice - discountAmount;
        setSalePrice(discountAmount);
        setTotalPrice(discountedPrice - pointsToUse);
    };

    // 숫자 포맷팅
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    // 날짜변경
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    // 요일 구하기
    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        const dayIndex = date.getDay(); // 0(일요일) ~ 6(토요일)

        // 요일 이름 배열
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        return daysOfWeek[dayIndex]; // 요일 이름 반환
    };

    // 몇 박인지 구하기
    const calculateNights = (checkInStr, checkOutStr) => {
        if (!checkInStr || !checkOutStr) return 0;

        const checkInDate = new Date(checkInStr).toISOString().split('T')[0];
        const checkOutDate = new Date(checkOutStr).toISOString().split('T')[0];

        // Date 객체로 변환
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // 날짜 차이 계산 (밀리초 단위)
        const timeDiff = checkOut - checkIn;

        // 밀리초를 일 수로 변환
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        return daysDiff; // 몇 박인지 반환
    };


    // 시간 변환
    const formatCheckTime = (timeStr) => {
        if (typeof timeStr === 'string') {
            return timeStr.substring(0, 5); // "15:00:00" -> "15:00"
        }
        return ''
    };

    return (
        <div className="re--container">
            <BackNav title="객실 예약" />

            <div className="re--wrap">
                {/* 예약할 호텔 정보 */}
                <div className="hotel--info">
                    <div className="hotel--title">
                        <span>{hotelRoomInfo?.hotelName}</span>
                    </div>

                    <img src={hotelRoomInfo?.hotelThumbnail} alt="호텔 이미지" />

                    <div className="hotel--info--box">
                        <span>객실</span>
                        <span>{hotelRoomInfo?.roomName}</span>
                    </div>

                    <div className="hotel--info--box">
                        <span>일정</span>
                        <span>
                            {formatDate(hotelRoomInfo?.roomCheckIn)} ({getDayName(hotelRoomInfo?.roomCheckIn)}) {formatCheckTime(hotelRoomInfo?.roomCheckinTime)} ~ {formatDate(hotelRoomInfo?.roomCheckOut)} ({getDayName(hotelRoomInfo?.roomCheckOut)}) {formatCheckTime(hotelRoomInfo?.roomCheckoutTime)} | {calculateNights(hotelRoomInfo?.roomCheckIn, hotelRoomInfo?.roomCheckOut)}박
                        </span>
                    </div>

                    <div className="hotel--info--box">
                        <span>기준인원</span>
                        <span>{hotelRoomInfo?.roomPeopleInfo}</span>
                    </div>
                </div>

                {/* 사용자 정보 */}
                <div className="profile--info">
                    <span className="section--title">예약자 정보</span>
                    <div className="profile--box">
                        <span>예약자 이름</span>
                        <input
                            ref={nameInputRef}
                            value={name}
                            onChange={handleNameChange}
                            maxLength={15}
                            className={`input--name ${nameWarning && 'warning'}`}
                        />
                    </div>

                    {nameWarning && <div className="name--warning">이름은 2자 ~ 15자 이내로 작성해주세요.</div>}

                    <div className="profile--box">
                        <span>휴대폰 번호</span>
                        <div className="input--phone">
                            <input
                                ref={phoneInputRef}
                                value={phone}
                                readOnly={!phoneEdit}
                                onChange={handlePhoneChange}
                                placeholder="휴대폰번호 입력"
                                maxLength={13}
                                className={phoneEdit ? 'phone--enabled' : 'phone--disabled'}
                            />

                            {phoneEdit &&
                                <button className={`send--num--btn ${!isButtonEnabled && 'disabled'}`}
                                    disabled={!isButtonEnabled}
                                    onClick={!verificationSent ? sendVerification : resendVerification}
                                >
                                    {!verificationSent ? "인증번호 전송" : "재전송"}
                                </button>
                            }

                            {!phoneEdit &&
                                <button
                                    className="phone--edit--btn"
                                    onClick={!phoneEdit ? handlePhoneEdit : null}
                                >
                                    휴대폰 번호 수정
                                </button>
                            }

                        </div>

                    </div>
                    {!isVerifiedPhone && (
                        <div className={`wraning--message--phone ${!isVerifiedPhone && 'hide'}`}>{verificationMessage}</div> // 인증 실패 메시지
                    )}

                    {verificationSent && (
                        <>
                            <div className='input--box'>

                                <input
                                    id='verificationCode'
                                    placeholder="인증번호"
                                    ref={verificationCodeRef}
                                    value={verificationCode}
                                    maxLength={6}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                                <button onClick={verifyCode} className={`send--num--btn ${!isVerificationCodeBtnEnabled && 'disabled'}`}
                                    disabled={!isVerificationCodeBtnEnabled}
                                >
                                    확인
                                </button>
                                <div className='timer'>
                                    {formatTime()}
                                </div>
                                {!isVerified && (
                                    <div className="wraning--message">{verificationMessage}</div> // 인증 실패 메시지
                                )}
                            </div>

                        </>
                    )}
                    <div
                        className={
                            phoneEdit ? "phone--cancle--btn focus" : "hide"
                        }
                        onClick={handlePhoneEditCancle}
                    >
                        취소
                    </div>
                </div>

                {/* 결제 수단 */}
                <div className="payType--wrap">
                    <div className="payType--title--box">
                        <span className="section--title">결제수단</span>
                        <BsExclamationCircle className="pay--sale--icon" />
                        <div className="sale--info">
                            {hotelRoomInfo?.disList.map((dis, index) =>
                                dis.disRate > 0 ? (
                                    <div key={index}>
                                        {dis.disCategory} : {dis.disRate}%
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>
                    <div>
                        <ul className="payType--box">
                            {hotelRoomInfo?.disList.map((dis) => (
                                <li className={`payType ${payType?.disNo === dis.disNo ? "selected" : ""}`} key={dis.disNo} onClick={() => handlePayTypeChange(dis)}>
                                    <PayType payType={dis} />
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
                        <span>{hotelRoomInfo?.roomPrice.toLocaleString()}원</span>
                    </div>

                    <div className="pay--box">
                        <span>할인 금액</span>
                        <div className="pay--discount--box">
                            {payType?.disRate > 0 ? (
                                <span className="sale--info">
                                    ({payType.disCategory} : {payType.disRate}%)
                                </span>
                            ) : null}
                            <span>{salePrice.toLocaleString()}원</span>
                        </div>
                    </div>

                    <div className="pay--box">
                        <span>포인트</span>
                        <div className="point--box">
                            <div className="user--point--box">
                                <span>보유 포인트 : {userInfo?.userPoint.toLocaleString()}p</span>
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
                                <input type="text" value={inputPoint ? formatNumber(inputPoint) : ""} onChange={handleInputChange} />
                                <span>원</span>
                            </div>
                        </div>
                    </div>

                    <hr type="dashed" className="dash--line"></hr>

                    <div className="totalpay--box">
                        <span>총 결제 금액</span>
                        <span>{totalPrice?.toLocaleString()}원</span>
                    </div>
                </div>

                {/* 동의화면 */}
                <div className="agree--wrap">
                    <AgreeInfo agreeInfo={agreeInfo} />
                    <AgreeChkInfo agreeChkInfo={agreeChkInfo} checkItems={checkItems} handleSingleCheck={handleSingleCheck} handleAllCheck={handleAllCheck} />
                    {/* 결제버튼 */}
                    <button disabled={checkItems.length !== agreeChkInfo.length} onClick={paymentClick}>{totalPrice?.toLocaleString()}원 결제하기</button>
                </div>
            </div>
            <Navbar />
        </div >
    );
}
