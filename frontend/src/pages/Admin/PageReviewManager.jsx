import React, { useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'

export default function PageReviewManager() {

    //하위요소가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        console.log('fromChild: ' + fromMyChild);
        setText_fromChild(fromMyChild);
    }


    function deleteReview() {   //하위요소 '삭제' 버튼에 상속해줄 함수
        alert('정말 삭제?');

    }


    return (
        <>
            <div className='page--review--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className='d-flex justify-content-between mb-3'>
                        <p>하위컴포넌트(검색창)가 준 값: {text_fromChild}</p>
                        {/* 하위요소를 생성하면서, 상위요소를 부르면 실행할 함수명을 지정 */}
                        <CompAdminSearch where={'admin-review'} callParent={functionForMyChild} />
                    </div>

                    <Table striped bordered hover id='table_entire_review'>
                        <thead id="table_header">
                            <tr>
                                <th>#</th>
                                <th>리뷰 내용</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            <tr>
                                <td>1</td>
                                <td>이벤트 내용</td>
                                <td>작성자1</td>
                                <td>24.10.15.</td>
                                <td className='btn_container'>
                                    <CompAdminBtn click={deleteReview}>삭제</CompAdminBtn>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                </Container>
            </div>
        </>
    )
}
