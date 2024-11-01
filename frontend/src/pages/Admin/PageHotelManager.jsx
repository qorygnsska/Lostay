import React from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import { Container, Form, Pagination, Table } from 'react-bootstrap'

export default function PageHotelManager() {

    //하위요소가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        //console.log('fromChild: ' + fromMyChild);
        // setText_fromChild(fromMyChild);
        // setActivePage(1);//검색어가 바뀔 때 1page 요청
    }


    return (

        <div className='page--hotel--manager--container page--admin'>

            <CompHeaderAdmin />

            <Container id='container_section'>

                {/*<p className='mb-2'>하위컴포넌트(검색창)가 준 값: {text_fromChild}</p>*/}
                <div className='d-flex justify-content-end mb-3'>
                    {/* 하위요소를 생성하면서, 상위요소를 부르면 실행할 함수명을 지정 */}
                    <CompAdminSearch where={'admin-review'} callParent={functionForMyChild} />
                </div>

                {/* <div id="container_paging" className="d-flex justify-content-center">
                    <Pagination hidden={pageComp.length === 0 ? true : false}>
                        <Pagination.First onClick={() => setActivePage(1)} />
                        <Pagination.Prev onClick={() => setActivePage(activePage - 1 < 1 ? 1 : activePage - 1)} />
                        {pageComp}
                        <Pagination.Next onClick={() => setActivePage(activePage + 1 > pageCount ? pageCount : activePage + 1)} />
                        <Pagination.Last onClick={() => setActivePage(pageCount)} />
                    </Pagination>
                </div> */}

            </Container>


        </div>

    )
}
