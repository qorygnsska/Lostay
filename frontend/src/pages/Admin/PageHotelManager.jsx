import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import { Container, Form, Pagination, Table } from 'react-bootstrap'
import { adminPrivateApi } from '../../api/adminApi'
import HotelEditAdmin from '../../componets/Admin/HotelEditAdmin'

export default function PageHotelManager() {

    //하위요소가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        //console.log('fromChild: ' + fromMyChild);
        // setText_fromChild(fromMyChild);
        // setActivePage(1);//검색어가 바뀔 때 1page 요청
    }

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
    // 호텔,객실 데이터
    const [hotelRoomList, setHotelRoomList] = useState(null);


    const getData = async () => {
        try {
            const response = await adminPrivateApi.get(`http://localhost:9090/admin/hotelsList?page=${curPage}`)

            if (response.status === 200) {
                setHotelRoomList(response.data)
                setTotalPage(response.data.totalPages)
                console.log(response.data)
            } else {
                console.log('에러')
            }
        } catch (error) {
            console.log('에러')
        }
    }

    useEffect(() => {
        getData()
    }, [curPage]);
    // 호텔,객실 데이터 끝
    // ==================== END ======================== //

    // ==================== START ======================== //
    // 호텔 수정 모달
    const [modalShow, setModalShow] = useState(false);
    const [propHotel, setPropHotel] = useState(null);

    const handleModalShow = () => {

        ModalToggle(); // 모달 열기
    };

    const propHotelChange = (hotel) => {
        console.log(hotel)
        setPropHotel(hotel)

    }

    const ModalToggle = () => {
        setModalShow(!modalShow)
    }
    // 호텔 수정 모달
    // ==================== END ======================== //

    return (

        <div className='page--hotel--manager--container page--admin'>

            <CompHeaderAdmin />

            <div className='page--wrap'>

                <div id='container_section'>

                    {/*<p className='mb-2'>하위컴포넌트(검색창)가 준 값: {text_fromChild}</p>*/}
                    <div className='d-flex justify-content-end mb-3'>
                        {/* 하위요소를 생성하면서, 상위요소를 부르면 실행할 함수명을 지정 */}
                        <CompAdminSearch where={'admin-review'} callParent={functionForMyChild} />
                    </div>


                    {/* 호텔리스트 */}
                    <Table striped bordered hover id='table_entire_review'>
                        <thead id="table_header">
                            <tr>
                                <th className="hotel_no">No</th>
                                <th className="hotel_name">호텔명</th>
                                <th className="hotel_rating">등급</th>
                                <th className="hotel_address">주소</th>
                                <th className="hotel_commission">중개료</th>
                                <th className="hotel_totalRoomCount">객실 수</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            {hotelRoomList?.content.map(function (hotel, index) {
                                return (
                                    <tr key={index}>
                                        <td className="hotel_no">{hotel.hotelNo}</td>
                                        <td className="hotel_name">{hotel.hotelName}</td>
                                        <td className="hotel_rating">{hotel.hotelRating ? hotel.hotelRating : '-'}</td>
                                        <td className="hotel_address">{hotel.hotelAdress}</td>
                                        <td className="hotel_commission">{hotel.hotelCommission}</td>
                                        <td className="hotel_totalRoomCount">{hotel.totalRoomCount}</td>
                                        <td className="btn_container">
                                            {/*수정 또는 삭제 버튼에 어디서 뭘 누르는지 알려주기 */}
                                            <button type='button' onClick={() => propHotelChange(hotel)}>수정</button>
                                            <button roomList={hotel.rooms} >객실보기</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>


                    {/* 페이지 네이션 */}
                    <div id="container_paging" className="d-flex justify-content-center">
                        <Pagination hidden={totalPage === 1 ? true : false}>
                            <Pagination.First onClick={() => { setActivePage(1); setCurPage(1); }} />
                            <Pagination.Prev onClick={() => { setActivePage(Math.max(1, activePage - 1)); setCurPage(Math.max(1, activePage - 1)); }} />
                            {createPaginationItems()}
                            <Pagination.Next onClick={() => { setActivePage(Math.min(totalPage, activePage + 1)); setCurPage(Math.min(totalPage, activePage + 1)); }} />
                            <Pagination.Last onClick={() => { setActivePage(totalPage); setCurPage(totalPage); }} />
                        </Pagination>
                    </div>


                </div>

                <HotelEditAdmin propHotel={propHotel} />

            </div>


        </div>

    )
}
