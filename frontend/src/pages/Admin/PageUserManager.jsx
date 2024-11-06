import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Form, Pagination, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import { adminPrivateApi } from '../../api/adminApi';

export default function PageUserManager() {

    //default: 전체 보기 vs 비활성 유저만 보기
    const [viewInactive, setViewInactive] = useState(false);

    function filterHandler() {
        setViewInactive(!viewInactive);
        setActivePage(1);//필터가 켜질 때 1page 요청
    }

    //하위요소(검색창)가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        //console.log('fromChild: ' + fromMyChild);
        setText_fromChild(fromMyChild);
        setActivePage(1);//검색어가 바뀔 때 1page 요청
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

    const getUserList = (inactive ,userName, requestedPage) => {

        console.log(`getUser ViewInactive: ${viewInactive} userName: ${userName} page: ${requestedPage}`);

        //인증 토큰 연계한 Axios 'GET' request by privateApi(Customized Comp)
        // async&await이나 then()은 같은 것
        adminPrivateApi.get(`/admin/userList?inactive=${inactive}&userName=${userName}&page=${requestedPage}`)
            .then(response => {
                //console.log(response);
                //console.log(response.data);
                setUserList(response.data.content); //Page<DTO>.getContent()
                setPageCount(response.data.totalPages); // Page<DTO>.getTotalPages()
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
        getUserList(viewInactive, text_fromChild, activePage);
    }, [viewInactive, text_fromChild, activePage]);


    return (
        <>
            <div className='page--user--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='container_section'>

                    <div className='d-flex justify-content-end mb-3'>
                        <Form.Switch id="switch_viewer" label="'비활성' 보기" onClick={filterHandler} />
                        <CompAdminSearch where={'admin-user'} callParent={functionForMyChild} />
                    </div>

                    <Table bordered hover id='table_entire_user'>
                        {/* striped  */}
                        <thead id="table_header">
                            <tr>
                                <th className="user_no">No</th>
                                <th className="user_name">이름</th>
                                <th className="user_nick">별명</th>
                                <th className="user_email">이메일</th>
                                <th className="user_phone">전화번호</th>
                                <th className="user_point">포인트</th>
                                <th className="user_cDate">가입일</th>
                                <th className="user_stat">활성</th>
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
                                        <td className="user_point">{user.userPoint.toLocaleString()}P</td>
                                        <td className="user_cDate">{dateFormatter(eachDate)}</td>
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
