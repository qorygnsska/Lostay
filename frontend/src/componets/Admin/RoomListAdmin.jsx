import React, { useEffect, useState } from 'react'
import { Pagination, Table } from 'react-bootstrap';
import { adminPrivateApi } from '../../api/adminApi';

export default function RoomListAdmin({ propHotelNo, setRoom, setRoomModalShow, setHotelModalShow, roomReload, setRoomReload }) {
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
    const [roomList, setRoomList] = useState(null);
    const getData = async () => {
        try {
            const response = await adminPrivateApi.get(`http://localhost:9090/admin/roomsList?hotelNo=${propHotelNo}&page=${curPage}`)

            if (response.status === 200) {
                setRoomList(response.data)
                setTotalPage(response.data.totalPages)
            } else {
                console.log('에러')
            }
        } catch (error) {
            console.log('에러')
        }
    }

    useEffect(() => {
        getData()
    }, [curPage, propHotelNo]);


    useEffect(() => {
        if (roomReload) {
            getData();
            setRoomReload(false);
        }
    }, [roomReload]);

    // ==================== END ======================== //

    // ==================== START ======================== //
    // 객실 수정 모달
    const [propRoom, setPropRoom] = useState(null);

    const propRoomChange = (room) => {
        setHotelModalShow(false)
        setRoomModalShow(true)
        setPropRoom(room)
        setRoom(room)
    }
    // ==================== END ======================== //
    return (
        <div className='RoomListAdmin'>

            {/* 룸리스트 */}
            <Table striped bordered hover id='table_entire_review'>
                <thead id="table_header">
                    <tr>
                        <th className="room_no">No</th>
                        <th className="room_name">객실명</th>
                        <th className="room_price">가격</th>
                        <th className="room_discount">할인율</th>
                        <th className="room_update">수정</th>
                    </tr>
                </thead>
                <tbody id="table_body">
                    {roomList?.content.map(function (room, index) {
                        return (
                            <React.Fragment key={room.roomNo}>
                                <tr key={room.roomNo}>
                                    <td className="room_no">{room.roomNo}</td>
                                    <td className="romm_name">{room.roomName}</td>
                                    <td className="room_price">{room.roomPrice.toLocaleString()}원</td>
                                    <td className="room_discount">{room.roomDiscount}%</td>
                                    <td className="btn_container">
                                        {/*수정 또는 삭제 버튼에 어디서 뭘 누르는지 알려주기 */}
                                        <button type='button' onClick={() => propRoomChange(room)}>수정</button>
                                    </td>
                                </tr>
                            </React.Fragment >
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
    )
}
