import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Form, Pagination, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'
import { privateApi } from '../../api/api'
import axios from 'axios'

export default function PageReviewManager() {

    //default: 전체 보기 vs 숨긴 리뷰만 보기
    const [viewUnderSanction, setViewUnderSanction] = useState(false);

    function filterHandler() {
        setViewUnderSanction(!viewUnderSanction);
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

    // db에서 받아올 reviewList(array)
    const [reviewList, setReviewList] = useState([]); //초기값은 []: empty array

    const getReviewList = (underSanction, userName, requestedPage) => {

        console.log(`getReview ViewUnderSanction: ${underSanction} userName: ${userName} page: ${requestedPage}`);

        //인증 토큰 연계한 Axios 'GET' request by privateApi(Customized Comp)
        // async&await이나 then()은 같은 것
        axios.get(`http://localhost:9090/adminReviewList?underSanction=${underSanction}&userName=${userName}&page=${requestedPage}`)
            .then(response => {
                //console.log(response);
                console.log(response.data);
                setReviewList(response.data.content); //Page<DTO>.getContent()
                setPageCount(response.data.totalPages); // Page<DTO>.getTotalPages()
            })
            .catch(error => {
                console.log(error);
                alert('리뷰 정보를 불러올 수 없습니다.');
                window.location.href = "/admin-home";
            })

    }

    //1st arg getReviewList() : getReviewList 메서드에 effect 사용
    //2nd arg [] : 빈 배열이면 처음 마운트될 때만 실행,,, 배열에 담긴 변수가 변할 때마다 실행하려 re-rendering
    useEffect(() => {
        getReviewList(viewUnderSanction, text_fromChild, activePage);
    }, [viewUnderSanction, text_fromChild, activePage]);


    return (
        <>
            <div className='page--review--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='container_section'>

                    {/*<p className='mb-2'>하위컴포넌트(검색창)가 준 값: {text_fromChild}</p>*/}
                    <div className='d-flex justify-content-end mb-3'>
                        {/* 하위요소를 생성하면서, 상위요소를 부르면 실행할 함수명을 지정 */}
                        <Form.Switch id="switch_viewer" label="'비공개' 보기" onClick={filterHandler} />
                        <CompAdminSearch where={'admin-review'} callParent={functionForMyChild} />
                    </div>

                    <Table striped bordered hover id='table_entire_review'>
                        <thead id="table_header">
                            <tr>
                                <th className="review_no">#</th>
                                <th className="user_name">작성자</th>
                                <th className="hotel_name">호텔</th>
                                <th className="room_name">객실</th>
                                <th className="review_rating">평점</th>
                                <th className="review_content">리뷰 내용</th>
                                <th>작성일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            {/* <tr>
                                <td>1</td>
                                <td>작성자1</td>
                                <td>이벤트 내용</td>
                                <td>24.10.15.</td>
                                <td className='btn_container'>
                                    <CompAdminBtn whoAreYou={'hide_review'} no={'0'}>숨김</CompAdminBtn>
                                </td>
                            </tr> */}
                            {reviewList.map(function (review, index) {
                                const eachDate = new Date(review.reviewCreateAt);

                                let alreadySanctioned = false;
                                if (review.reviewSanctionsAt !== null) {//날짜가 들어있으면 이미 제재 당함
                                    alreadySanctioned = true;
                                }

                                return (
                                    <tr key={index}>
                                        <td className="review_no">{review.reviewNo}</td>
                                        <td className="user_name">{review.userName}</td>
                                        <td className="hotel_name">{review.hotelName}</td>
                                        <td className="room_name">{review.roomName}</td>
                                        <td className="review_rating">{review.reviewRating}</td>
                                        <td className="review_content">{review.reviewContent}</td>
                                        <td className="review_date">{dateFormatter(eachDate)}</td>
                                        <td className="btn_container">
                                            {/*수정 또는 삭제 버튼에 어디서 뭘 누르는지 알려주기 */}
                                            <CompAdminBtn whoAreYou={'hide_review'} no={review.reviewNo} disable={alreadySanctioned} >제재</CompAdminBtn>
                                        </td>
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
