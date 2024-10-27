import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Pagination, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import axios from 'axios';

export default function PageUserManager() {

    //활성유저만 보기, 비활성 유저만 보기 등등 필터 넣을건지?


    //하위요소가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        //console.log('fromChild: ' + fromMyChild);
        setText_fromChild(fromMyChild);
        setActivePage(1);
    }


    // Date type -> String type(두자리수 맞춤)
    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString().padStart(2, '0') + "/" + rawDate.getDate().toString().padStart(2, '0'));

    /////////////////////////////////////////////////////////////////////////////// pagination에 필요한 값들
    const [pageCount, setPageCount] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const pageComp = [];  //pageCount(totalPage) 개수만큼 페이지 버튼 컴포넌트를 담을 배열 초기화
    for (let page = 1; page <= pageCount; page++) {
        pageComp.push(
            <Pagination.Item key={page} active={page === activePage} onClick={() => setActivePage(page)}>{page}</Pagination.Item>
        )
    }
    /////////////////////////////////////////////////////////////////////////////// pagination에 필요한 값들

    // db에서 받아올 userList(array)
    const [userList, setUserList] = useState([]); //초기값은 []: empty array

    //////////////////////임시데이터
    const user1 = {
        userNo: 1,
        userName: '심재호',
        userEmail: 'shim@lostay.com',
        userPhone: '010-1111-1111',
        userPoint: 1200,
        userStatus: '탈퇴'
    };

    const user2 = {
        userNo: 2,
        userName: '박정일',
        userEmail: 'qwer@lostay.com',
        userPhone: '010-2222-2222',
        userPoint: 2000,
        userStatus: '활동'
    };
    //////////////////////임시데이터

    const getUserList = (userName, requestedPage) => {

        console.log(`getUser userName: ${userName} page: ${requestedPage}`);

        //인증 토큰 연계한 Axios 'GET' request by privateApi(Customized Comp)
        // async&await이나 then()은 같은 것
        axios.get(`http://localhost:9090/adminUserSearch?userName=${userName}&page=${requestedPage}`)
            .then(response => {
                //console.log(response);
                console.log(response.data);
                setUserList(response.data.content); //Page<DTO>.getContent()
                setPageCount(response.data.totalPages); // Page<DTO>.getTotalPages()

                //////////////////////임시데이터
                if(response.data.totalPages===0) {
                    setUserList([user1, user2]);
                    setPageCount(1);
                }
                //////////////////////임시데이터
            })
            .catch(error => {
                console.log(error);
                alert('회원 정보를 불러올 수 없습니다.');
                window.location.href = "/admin-home";
            })

    }

    //1st arg getUserList() : getUserList 메서드에 effect 사용
    //2nd arg [] : 빈 배열이면 처음 마운트될 때만 실행,,, 배열에 담긴 변수가 변할 때마다 실행하려 re-rendering
    useEffect(() => {
        getUserList(text_fromChild, activePage);
    }, [text_fromChild, activePage]);


    return (
        <>
            <div className='page--user--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='container_section'>

                    <div className='d-flex justify-content-end mb-3'>
                        <CompAdminSearch where={'admin-user'} callParent={functionForMyChild} />
                    </div>

                    <Table striped bordered hover id='table_entire_user'>
                        <thead id="table_header">
                            <tr>
                                <th className="user_no">#</th>
                                <th className="user_name">이름</th>
                                <th className="user_nick">별명</th>
                                <th className="user_email">이메일</th>
                                <th className="user_phone">전화번호</th>
                                <th className="user_cDate">가입일</th>
                                <th className="user_point">포인트</th>
                                <th className="user_stat">계정 상태</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            {userList.map(function (user, index) {
                                const eachDate = new Date(user.userCreateAt);

                                return (
                                    <tr key={index}>
                                        <td className="user_no">{user.userNo}</td>
                                        <td className="user_name">{user.userName}</td>
                                        <td className="user_nick">{user.userNickname}</td>
                                        <td className="user_email">{user.userEmail}</td>
                                        <td className="user_phone">{user.userPhone}</td>
                                        <td className="user_cDate">{dateFormatter(eachDate)}</td>
                                        <td className="user_point">{user.userPoint}</td>
                                        <td className="user_stat">{user.userStatus}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <div id="container_paging" className="d-flex justify-content-center">
                        <Pagination hidden={pageComp.length === 0 ? true : false}>
                            <Pagination.First onClick={() => setActivePage(1)} />
                            <Pagination.Prev onClick={() => setActivePage(activePage - 1 < 1 ? 1 : activePage - 1)} />
                            {pageComp}
                            <Pagination.Next onClick={() => setActivePage(activePage + 1 > pageCount ? pageCount : activePage + 1)} />
                            <Pagination.Last onClick={() => setActivePage(pageCount)} />
                        </Pagination>
                    </div>

                </Container>
            </div>
        </>
    )
}
