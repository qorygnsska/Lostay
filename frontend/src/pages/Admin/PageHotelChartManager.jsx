import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Dropdown, Pagination, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import { adminPrivateApi } from '../../api/adminApi';
import { Line } from 'react-chartjs-2';
import { FaSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PageHotelChartManager() {
    /////////////////////////////////////////////////////////////////LoginState
    const navigate = useNavigate();
    const adminState = useSelector((state) => state.admin.adminState);
    const adminAT = useSelector((state) => state.admin.adminAT)

    useEffect(() => {

        if (adminState === false) {
            alert('접근이 불가능합니다.');
            navigate("/admin-login");
        } else {
            //console.log(adminAT);
        }
    }, []);
    /////////////////////////////////////////////////////////////////LoginState

    // ==================== START ======================== //
    // 페이지 네이션
    const [totalPage, setTotalPage] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [curPage, setCurPage] = useState(1);

    const createPaginationItems = () => {
        const items = [];
        const startPage = Math.max(1, activePage - 2);
        const endPage = Math.min(totalPage, startPage + 4);
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === activePage} onClick={() => {
                    setActivePage(number);
                    setCurPage(number);
                }}>
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };
    // 페이지 네이션 끝
    // ==================== END ======================== //


    // ==================== START ======================== //
    //하위요소(검색창)가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');
    // ==================== END ======================== //
    const functionForMyChild = (fromMyChild) => {
        setText_fromChild(fromMyChild);
        setActivePage(1);//검색어가 바뀔 때 1page 요청
    }

    // ==================== START ======================== //

    // ==================== START ======================== //
    // 호텔,객실 데이터
    const [hotelRoomList, setHotelRoomList] = useState(null);


    const getData = async (searchText) => {
        try {
            const response = await adminPrivateApi.get(`/admin/hotelsList?page=${curPage}&searchText=${searchText}&showCnt=5`)

            if (response.status === 200) {
                setHotelRoomList(response.data)
                setTotalPage(response.data.totalPages)
                //console.log(response.data)
            }
        } catch (error) {
            alert('잘못된 요청 입니다.')
        }
    }

    useEffect(() => {
        let searchText = ''
        if (text_fromChild) {
            searchText = text_fromChild.trim().replace(" ", "")
        }
        getData(searchText)
    }, [curPage, text_fromChild]);
    // 호텔,객실 데이터 끝
    // ==================== END ======================== //

    // ==================== START ======================== //
    // 드롭 다운
    const startYear = 2023;
    const currentYear = new Date().getFullYear(); // 현재 년도 가져오기
    const setYear = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();

    const [selectedYear, setSelectedYear] = useState(setYear[0]);

    const handleSelect = (eventKey) => {
        setSelectedYear(setYear[eventKey]);

    };
    // 드롭 다운
    // ==================== END ======================== //



    // ==================== START ======================== //
    // 호텔 차트
    const [propHotel, setPropHotel] = useState(null);

    const propHotelChange = (hotel) => {
        setPropHotel(hotel)
    }

    const revenueData = async () => {
        try {
            const response = await adminPrivateApi.get(`/admin/revenueData?hotelNo=${propHotel.hotelNo}&year=${selectedYear}`)

            if (response.status === 200) {
                //console.log(response.data)
                setBranchChart(response.data.revenueData)
            } else if (response.status === 204) { //data is empty
                //console.log('no-content')
                setBranchChart([]);
            }
        } catch (error) { //data is null
            //console.log('null(404)')
            setBranchChart([]);
        }
    }

    useEffect(() => {
        revenueData();
    }, [propHotel, selectedYear])
    // 호텔 차트
    // ==================== END ======================== //

    // ==================== START ======================== //
    // 분기별 중개료, 예약건수
    const [branchChart, setBranchChart] = useState([]);
    const [branchLabel, setBranchLabel] = useState([]);
    const [totalBranchCommission, setTotalBranchCommission] = useState('')
    const [totalBranchReservations, setTotalBranchReservations] = useState('')
    const [totalBranchCommissionData, setTotalBranchCommissionData] = useState([]);
    const [totalBranchReservationsData, setTotalBranchReservationsData] = useState([]);

    useEffect(() => {
        const initialData = Array.from({ length: 4 }, (_, i) => ({
            quarter: i + 1,
            totalCommission: 0,
            totalReservations: 0,
        }));
        if (branchChart.length > 0) {
            // branchChart에서 데이터 업데이트
            branchChart.forEach(data => {
                const quarter = data.quarter - 1; // 0부터 시작하는 인덱스
                initialData[quarter] = {
                    quarter: data.quarter,
                    totalCommission: data.totalCommission || 0,
                    totalReservations: data.totalReservations || 0,
                };
            });
        }
        const labels = initialData.map(data => `${data.quarter}분기`);
        const totalCommissionData = initialData.map(data => data.totalCommission);
        const totalReservationsData = initialData.map(data => data.totalReservations);

        // const labels = branchChart.map(data => `${data.quarter}분기`);
        // const totalCommissionData = branchChart.map(data => data.totalCommission);
        // const totalReservationsData = branchChart.map(data => data.totalReservations);

        // 총합 계산
        setTotalBranchCommission(totalCommissionData.reduce((acc, curr) => acc + curr, 0));
        setTotalBranchReservations(totalReservationsData.reduce((acc, curr) => acc + curr, 0));

        setBranchLabel(labels);
        setTotalBranchCommissionData(totalCommissionData);
        setTotalBranchReservationsData(totalReservationsData);

    }, [branchChart]);


    const branchData = {
        labels: branchLabel,
        datasets: [
            {
                type: 'line',
                label: '분기별 중개료',
                borderColor: 'rgb(54, 162, 235)',
                data: totalBranchCommissionData,
                yAxisID: 'y1',
            },
            {
                type: 'line',
                label: '분기별 예약수',
                borderColor: 'rgba(255, 99, 132)',
                data: totalBranchReservationsData,
                yAxisID: 'y2',
            }
        ],
    };

    const branchOptions = {
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                ticks: {
                    stepSize: 100000, // 세분화된 눈금 간격 설정
                    callback: function (value) {
                        return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
                    }
                }
            },
            y2: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                max: 50,
                ticks: {
                    stepSize: 1, // 세분화된 눈금 간격 설정
                    callback: function (value) {
                        return value.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
                    }
                }
            }
        }
    };

    // 분기별 중개료, 예약건수
    // ==================== END ======================== //

    return (
        <div className='page--hotel--chart--manager--container page--admin'>

            <CompHeaderAdmin />

            <Container id='container_section'>
                {/* 검색 */}
                <div className='d-flex justify-content-end mb-3'>
                    {/* 하위요소를 생성하면서, 상위요소를 부르면 실행할 함수명을 지정 */}
                    <div className="dropdown--box">
                        <Dropdown onSelect={handleSelect} className="dropdown">
                            <Dropdown.Toggle>{selectedYear}년</Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown--menu">
                                {setYear.map((yearVal, idx) => (
                                    <Dropdown.Item key={idx} eventKey={idx}>
                                        {yearVal}년
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <CompAdminSearch where={'admin-review'} callParent={functionForMyChild} />
                </div>


                {/* 테이블 */}
                <div className='table--wrap'>
                    <Table bordered id='table_entire_hotel'>
                        <thead id="table_header">
                            <tr>
                                <th className="hotel_no">No</th>
                                <th className="hotel_name">호텔명</th>
                                <th className="hotel_rating">등급</th>
                                <th className="hotel_address">주소</th>
                                <th className="hotel_commission">중개료</th>
                                <th className="hotel_update">관리</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            {hotelRoomList?.content.map(function (hotel, index) {
                                return (
                                    <React.Fragment key={hotel.hotelNo}>
                                        <tr className={propHotel?.hotelNo === hotel.hotelNo ? 'table-primary ' : ''}>
                                            <td className="hotel_no">{hotel.hotelNo}</td>
                                            <td className="hotel_name">{hotel.hotelName}</td>
                                            <td className="hotel_rating">{hotel.hotelRating ? hotel.hotelRating : '-'}</td>
                                            <td className="hotel_address">{hotel.hotelAdress}</td>
                                            <td className="hotel_commission">{hotel.hotelCommission}%</td>
                                            <td className="btn_container">
                                                {/*수정 또는 삭제 버튼에 어디서 뭘 누르는지 알려주기 */}
                                                <button type='button' onClick={() => propHotelChange(hotel)} className='comp--admin--btn--container'>차트보기</button>
                                            </td>
                                        </tr>

                                    </React.Fragment>

                                )
                            })}
                        </tbody>
                    </Table>
                </div>{/* 페이지 네이션 */}
                <div id="container_paging" className="d-flex justify-content-center">
                    <Pagination hidden={totalPage === 1 ? true : false}>
                        <Pagination.First onClick={() => { setActivePage(1); setCurPage(1); }} />
                        <Pagination.Prev onClick={() => { setActivePage(Math.max(1, activePage - 1)); setCurPage(Math.max(1, activePage - 1)); }} />
                        {createPaginationItems()}
                        <Pagination.Next onClick={() => { setActivePage(Math.min(totalPage, activePage + 1)); setCurPage(Math.min(totalPage, activePage + 1)); }} />
                        <Pagination.Last onClick={() => { setActivePage(totalPage); setCurPage(totalPage); }} />
                    </Pagination>
                </div>

                {/* 차트 */}
                <div className='select--wrap'>
                    <div className='select--total'>
                        <div className='select--total--box'>
                            <ul>
                                <li>
                                    <div className='selYear'>{selectedYear}년</div>
                                    <div className='hotelName'>{propHotel?.hotelName}</div>
                                </li>
                                <li className='commossion--box'>
                                    <div className='info--title'><FaSquare className='commossion--icon' />중개료 ({totalBranchCommission.toLocaleString()}원)</div>
                                    <div className='branch--info'>
                                        {totalBranchCommissionData &&
                                            totalBranchCommissionData.map((data, index) => (
                                                <div className='info' key={index}>
                                                    <span>{index + 1}분기 : {data.toLocaleString()}원</span>
                                                </div>
                                            ))

                                        }
                                    </div>

                                </li>

                                <li className='reservation--box'>
                                    <div className='info--title'><FaSquare className='reservation--icon' />예약건수 ({totalBranchReservations.toLocaleString()}건)</div>
                                    <div className='branch--info'>
                                        {totalBranchReservationsData &&
                                            totalBranchReservationsData.map((data, index) => (
                                                <div className='info' key={index}>
                                                    <span>{index + 1}분기 : {data.toLocaleString()}건</span>
                                                </div>
                                            ))

                                        }
                                    </div>

                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className='chart'>
                        <Line data={branchData} options={branchOptions} /> {/* Line 컴포넌트 사용 */}
                    </div>
                </div>
            </Container>
        </div>
    )
}
