import React from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Button, Container, Table } from 'react-bootstrap'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'



export default function PageEventManager() {

    const openEventInserter = () => {
        console.log('click_open_eventInserter');

    }


    //CompAdminSearch_#btn_search 누르면 #input_search 값 가져오기(jQuery)




    const openEventUpdater = () => {
        console.log('click_open_eventInserter');

    }

    const deleteEvent = () => {
        console.log('click_delete_event');

    }

    return (
        <>
            <div className='page--event--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className='d-flex justify-content-between mb-3'>
                        <Button id="btn_enroll" onClick={openEventInserter} variant="outline-success" size="sm" >이벤트 등록</Button>
                        <CompAdminSearch />
                    </div>

                    <Table striped bordered hover id='table_entire_event'>
                        <thead id="table_header">
                            <tr>
                                <th>#</th>
                                <th>이벤트 제목</th>
                                <th>이벤트 기간</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            <tr>
                                <td>1</td>
                                <td>이벤트 제목1</td>
                                <td>24.10.14. ~ 24.10.21.</td>
                                <td className='btn_container'>
                                    <CompAdminBtn onClick={openEventUpdater}>수정</CompAdminBtn>
                                    <CompAdminBtn onclick={deleteEvent}>삭제</CompAdminBtn>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <CompEventInserter />
                    <CompEventUpdater />

                </Container>
            </div>
        </>
    )
}
