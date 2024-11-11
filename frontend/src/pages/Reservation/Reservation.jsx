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
import { replace, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useSelector } from "react-redux";


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

    // 첫 화면 데이터 가져오기
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const user = useSelector((state) => state.user.userState);
    const userAt = useSelector((state) => state.user.userAt)
    const navigate = useNavigate();
    const roomNo = queryParams?.get('roomNo');
    const checkInDate = queryParams?.get('checkInDate');
    const checkOutDate = queryParams?.get('checkOutDate');
    const hotelNo = queryParams?.get('hotelNo')
    const peopleMax = queryParams?.get('peopleMax')
    useEffect(() => {

        if (user === false || userAt === null) {
            alert("로그인 후 이용해주세요.");
            navigate("/login", { replace: true });

            return;
        } else if (roomNo === null || checkInDate === null || checkOutDate === null) {
            alert("잘못된 요청입니다.");
            navigate("/", { replace: true });

            return;
        }

        window.scrollTo(0, 0);

        const getData = async () => {
            // URL 파라미터에서 roomNo를 추출

            const formattedCheckInDate = checkInDate.split('T')[0];
            const formattedCheckOutDate = checkOutDate.split('T')[0];

            try {
                const [hotelRoomInfoResp, userInfoResp] = await Promise.all([
                    privateApi.get('/payment/HotelRoomInfo', {
                        params: {
                            roomNo: roomNo,
                            checkInDate: formattedCheckInDate, // 'YYYY-MM-DD' 형식의 날짜 전달
                            checkOutDate: formattedCheckOutDate,
                        },
                    }),
                    privateApi.get('payment/UserInfo'),
                ]);

                setHotelRoomInfo(hotelRoomInfoResp.data)

                setUserInfo(userInfoResp.data)
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, [])



    const [hotelRoomInfo, setHotelRoomInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    // 예약자 정보
    const [name, setName] = useState('');
    const nameInputRef = useRef(null);
    const [nameWarning, setNameWarning] = useState(false);

    // 예약자 이름 수정
    const handleNameChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.trim().length < 2) {
            setNameWarning(true)
        } else {
            setNameWarning(false)
        }


        const { target: { value }, } = e;
        if (value.length > 15) e.target.value = value.substr(0, 15);
        setName(e.target.value);
    }
    // 휴대폰번호 수정

    // 입력된 휴대폰 번호
    const [phone, setPhone] = useState('');
    const [userPhone, setUserPhone] = useState('');

    // 변경 전 휴대폰 번호
    const [prePhone, setPrePhone] = useState('');

    // 휴대폰 수정 On/ Off
    const [phoneEdit, setPhoneEidt] = useState(false);

    // 휴대폰 Input
    const phoneInputRef = useRef(null);
    const userPhoneInputRef = useRef(null);

    // 휴대폰 번호 수정 안했을 시 활성화
    const [isVerifiedPhone, setVerifiedPhone] = useState(true);

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

    // 페이지 타이머 함수
    // 15분 타이머 걸겅러야됌
    const [timerRunning, setTimerRunning] = useState(true);

    useEffect(() => {
        const currentTime = Date.now();
        let timerEndTime = localStorage.getItem("timerEndTime"); // 로컬 스토리지에서 종료 시간 가져오기

        // 타이머 종료 시간이 없다면 15분 후로 설정
        if (!timerEndTime) {
            timerEndTime = currentTime + 15 * 60 * 1000; // 15분 (900초) 후
            localStorage.setItem("timerEndTime", timerEndTime); // 로컬 스토리지에 타이머 종료 시간 저장
        }

        // 남은 시간 계산
        const updateTimeLeft = () => {
            const remainingTime = Math.max(0, Math.floor((timerEndTime - Date.now()) / 1000)); // 남은 시간(초) 계산

            // 타이머가 종료되면 다른 페이지로 이동
            if (remainingTime <= 0) {
                alert('결제 시간이 만료되었습니다.')
                navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })

                localStorage.removeItem("timerEndTime"); // 종료 후 로컬 스토리지에서 타이머 종료 시간 삭제
            }
        };


        // 뒤로 가기 버튼을 눌렀을 때 타이머 초기화


        const handlePopState = (event) => {
            //            navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
            localStorage.removeItem("timerEndTime"); // 타이머 종료 시간 삭제
            window.removeEventListener("popstate", handlePopState);
        };

        window.addEventListener("popstate", handlePopState); // 뒤로 가기 버튼 눌렀을 때 타이머 초기화

        // 컴포넌트 언마운트 시 타이머 정리
        let interval = null
        if (timerRunning) {
            // 타이머가 실행 중이면 1초마다 타이머 업데이트
            interval = setInterval(updateTimeLeft, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timerRunning, navigate]);

    const navigationType = useNavigationType();
    useEffect(() => {
        if (navigationType !== "POP") {
            localStorage.removeItem("timerEndTime");
        }
    }, [navigationType]);



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

    // 이용자 휴대폰번호 수정된 값
    const [isUserPhoneEdit, setIsUserPhoneEdit] = useState(true)
    const handleUserPhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setUserPhone(formattedPhone);
        // 이용자 전화번호 정상 여부
        const isUserPhone = formattedPhone.replace(/-/g, "").length === 10 || formattedPhone.replace(/-/g, "").length === 11;
        setIsUserPhoneEdit(isUserPhone);
    }

    // 이용자와 정보가 같을시
    const [sameUserChecked, setSameUserChecked] = useState(false)
    const handleSameUser = (checked) => {
        if (checked) {
            setSameUserChecked(true)
            setUserPhone(userInfo.userPhone)
            setName(userInfo.userName)
            setIsUserPhoneEdit(true)
        } else {
            setSameUserChecked(false)
            setUserPhone('')
            setName('')
            setIsUserPhoneEdit(false)
        }
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
            setVerifiedPhone(true);

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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sms/loginPhone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };


    // 전화번호 저장
    const postPhoneNumSave = async (phonenum) => {

        try {
            const response = await privateApi.post(`/mypage/UserInfo/phone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    // ==================== START ======================== //
    // 결제 (아임포트)
    const { IMP } = window;
    IMP.init('imp67745024');

    const paymentClick = () => {
        if (checkItems.length === agreeChkInfo.length) {
            // 이름 작성 여뷰
            if (phoneEdit) {
                alert('예약자 전화번호를 저장해주세요.')
                return;
            } else if (name.length === 0 || nameWarning === true) {
                alert('이름을 입력해주세요.')
                return;
            } else if (!isUserPhoneEdit) {
                alert('이용자 전화번호를 입력해주세요')
                return;
            }
            else if (payType === null) {
                alert('결제수단을 선택해주세요.')
                return;
            }

            setTimerRunning(false); // 타이머 멈춤
            localStorage.removeItem("timerEndTime"); // 타이머 종료 시간 삭제

            const merchant_uid = "merchant_" + new Date().getTime()
            privateApi.post('/payment/Before', {
                point: Number(inputPoint),
                roomNo: hotelRoomInfo.roomNo,
                disNo: payType.disNo,
                merchant_uid: merchant_uid,
                checkIn: `${hotelRoomInfo.roomCheckIn}T${hotelRoomInfo.roomCheckinTime}`,
                checkOut: `${hotelRoomInfo.roomCheckOut}T${hotelRoomInfo.roomCheckoutTime}`,
            })
                // 사전검증 성공
                .then((res) => {
                    if (res.status === 200) {
                        requestPay(payType.disPg, merchant_uid)
                    } else {
                        // accessToken 발급 실패 or 사전검증 요청 실패
                        alert('결제에 실패했습니다.')
                        navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
                        localStorage.removeItem("timerEndTime");
                    }

                })
                .catch((error) => {
                    // accessToken 발급 실패 or 사전검증 요청 실패
                    alert("결제에 실패했습니다.")
                    navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
                    localStorage.removeItem("timerEndTime");
                });
        }

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
                    privateApi.post(`/payment/Verification`, {
                        imp_uid: rsp.imp_uid,            // 결제 고유번호
                        merchant_uid: rsp.merchant_uid,   // 주문번호
                        amount: rsp.paid_amount
                    })
                        .then((res) => {
                            if (res.status === 200) {
                                if (rsp.paid_amount === res.data.response.amount) {
                                    // 최종 성공
                                    const originalDateTime = res.data.response.paidAt;


                                    // ISO 8601 형식의 날짜를 Date 객체로 변환
                                    const dateObject = new Date(originalDateTime);

                                    // 한국 시간으로 변환
                                    const payDay = new Date(dateObject.getTime() + (9 * 60 * 60 * 1000));

                                    putData(rsp, payDay);
                                } else {
                                    // 금액 불일치 환불해야함
                                    alert("결제에 실패했습니다.")
                                    Vcancle(rsp);
                                }
                            } else {
                                // 200 안오면 환불해야함
                                alert("결제에 실패했습니다.")
                                Vcancle(rsp);
                            }

                        })
                        .catch((error) => {
                            // 사후 검증 실패 환불해야함
                            alert("결제에 실패했습니다.")
                            Vcancle(rsp);
                        });
                } else {
                    // 결제 실패 했을 때
                    alert("결제에 실패했습니다.")
                    navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
                    localStorage.removeItem("timerEndTime");
                }
            });
        }
    }

    const putData = async (rsp, payDay) => {

        const rid = queryParams.get('rid')

        try {
            const result = await privateApi.post('/payment/Insert', {
                roomNo: hotelRoomInfo.roomNo,
                disNo: payType.disNo,
                payPrice: totalPrice,
                payPoint: inputPoint ? Number(inputPoint) : 0,
                payDay: payDay,
                checkIn: `${hotelRoomInfo.roomCheckIn}T${hotelRoomInfo.roomCheckinTime}`,
                checkOut: `${hotelRoomInfo.roomCheckOut}T${hotelRoomInfo.roomCheckoutTime}`,
                imp_uid: rsp.imp_uid,
                name: name,
                phone: userPhone,
                rid: rid,
            });

            if (result.status === 200) {
                alert('결제 완료되었습니다.')
                navigate('/', { replace: true });
            } else {
                // 데이터 삽입 실패 환불해야함..

                alert("결제에 실패했습니다.")
                Vcancle(rsp);
            }
        } catch (error) {
            // 환불해야함...
            alert("결제에 실패했습니다.")

            Vcancle(rsp);
        }
    }

    const Vcancle = async (rsp) => {
        try {
            // 성공적인 응답 처리
            const res = await privateApi.post('/payment/VCancle', {
                imp_uid: rsp.imp_uid,
            });

            if (res.status === 200) {
                navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
                localStorage.removeItem("timerEndTime");
            } else {
                alert('고객센터에 전화해주세요')
                navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
                localStorage.removeItem("timerEndTime");
            }

        } catch (error) {
            // 에러 처리
            alert('고객센터에 전화해주세요')
            navigate(`/roomList/${hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`, { replace: true })
            localStorage.removeItem("timerEndTime");
        }
    }
    // 결제
    // ==================== END ======================== //


    const [useAllPoints, setUseAllPoints] = useState(false); // 포인트 모두 사용
    const [inputPoint, setInputPoint] = useState(0); // 포인트 직접 입력
    const [totalPrice, setTotalPrice] = useState(0); // 총 결제 가격
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

        const point = newUseAllPoints ? (hotelRoomInfo.discountPrice - salePrice > userInfo.userPoint ? userInfo.userPoint
            : hotelRoomInfo.discountPrice - salePrice) : 0

        setInputPoint(point);
        updateTotalPrice(point, payType?.disRate, newUseAllPoints);
    };

    // 포인트 직접 입력
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/,/g, ""); // 입력값에서 쉼표 제거

        if (useAllPoints) {
            setUseAllPoints(false);
        }
        // 입력값이 숫자이고, 범위를 초과하지 않는지 확인
        if (/^\d*$/.test(value) && (value === "" || (parseInt(value, 10) <= userInfo?.userPoint && parseInt(value, 10) <= hotelRoomInfo.discountPrice - salePrice))) {
            setInputPoint(value);
            updateTotalPrice(value, payType?.disRate);
        }
    };

    // 결제 수단 선택 시 할인
    const handlePayTypeChange = (dis) => {
        setpayType(dis);
        updateTotalPrice(inputPoint, dis.disRate, useAllPoints);
    };

    // 총 결제금액 계산
    const updateTotalPrice = (points, sale = 0, selectAllPoint) => {
        const pointsToUse = parseInt(points, 10) || 0;
        const discountAmount = Math.floor((hotelRoomInfo.discountPrice * sale) / 100); // sale을 비율로 계산
        const discountedPrice = hotelRoomInfo.discountPrice - discountAmount;

        if (discountedPrice - pointsToUse < 0) {

            setInputPoint(inputPoint - (pointsToUse - discountedPrice))
            setTotalPrice(0)
        } else if (selectAllPoint) {

            const allPoint = userInfo.userPoint > discountedPrice ? discountedPrice : userInfo.userPoint
            setInputPoint(allPoint)
            setTotalPrice(discountedPrice - allPoint)
        } else {
            setTotalPrice(discountedPrice - pointsToUse);
        }

        setSalePrice(discountAmount); // type 선택 할인 가격
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

    useEffect(() => {
        setTotalPrice(hotelRoomInfo?.discountPrice.toLocaleString())
    }, [hotelRoomInfo])

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

                {/* 예약자 정보 */}
                <div className="profile--info">
                    <span className="section--title">예약자 정보</span>
                    <div className="profile--box">
                        <span>예약자 이름</span>
                        <span>{userInfo?.userName}</span>
                    </div>

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
                        <div className={`wraning--message--phone ${isVerifiedPhone && 'hide'}`}>{verificationMessage}</div> // 인증 실패 메시지
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

                {/* 이용자 정보 */}
                <div className="profile--info">
                    <span className="section--title">이용자 정보</span>

                    <div>
                        <input
                            type="checkbox"
                            name="sameUser"
                            id="sameUser"
                            onChange={(e) => handleSameUser(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        />
                        <label htmlFor="sameUser">
                            <div className="sameUser--box">
                                <MdOutlineCheckBox className={`sameUser--icon ${sameUserChecked && 'checked'}`} />
                                <span>예약자 정보와 동일</span>
                            </div>
                        </label>
                    </div>

                    <div className="profile--box">
                        <span>이용자 이름</span>
                        <input
                            type="text"
                            ref={nameInputRef}
                            value={name}
                            placeholder="이용자 이름 입력"
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
                                ref={userPhoneInputRef}
                                value={userPhone}
                                onChange={handleUserPhoneChange}
                                placeholder="휴대폰 번호 입력"
                                maxLength={13}
                                className={`userPhone ${!isUserPhoneEdit && 'warning'}`}
                            />
                        </div>
                    </div>

                    {!isUserPhoneEdit && <div className="userPhone--warning">12~13 자리를 입력해주세요</div>}
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
                        <span>{hotelRoomInfo?.discountPrice.toLocaleString()}원</span>
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
                    <div className={`pay--btn ${checkItems.length !== agreeChkInfo.length && 'disabled'}`} onClick={paymentClick}>{totalPrice?.toLocaleString()}원 결제하기</div>
                </div>
            </div>
            <Navbar />
        </div >
    );
}