import React from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Button, Table } from 'react-bootstrap'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'



export default function PageEventManager() {

    const enrollEvent = () => {

        console.log('click_enroll_event');
        
    }


    return (
        <>
            <div className='page--event--manager--container'>
                <CompHeaderAdmin />

                <h1>PageEventManager</h1>

                <div className='d-flex justify-content-between mb-3'>
                <Button id="btn_enroll" variant="outline-success" size="sm" type="button" onClick={enrollEvent}>이벤트 등록</Button>
                <CompAdminSearch />
                </div>

                <Table striped bordered hover id='table_entire_event'>
                    <thead id="table_header">
                        <tr>
                            <th>#</th>
                            <th>이벤트 제목</th>
                            <th>기간</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody id="table_body">
                        <tr>
                            <td>1</td>
                            <td>이벤트 제목1</td>
                            <td>24.10.14. ~ 24.10.21.</td>
                            <td className='btn_container'>
                                <CompAdminBtn>수정</CompAdminBtn>
                                <CompAdminBtn>삭제</CompAdminBtn>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <CompEventInserter />
                <CompEventUpdater />




            </div>

        </>
    )
}
