import React from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Button, Table } from 'react-bootstrap'
import CompSearchBoxAdmin from '../../componets/Search/CompSearchBoxAdmin'

export default function PageEventManager() {
    return (
        <>
            <div className='page--event--manager--container'>
                <CompHeaderAdmin />
                <h1>PageEventManager</h1>


                
                <CompSearchBoxAdmin />
                <Table striped bordered hover>
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
                                <button className="btn_manager">수정</button>
                                <button className="btn_manager">삭제</button>
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
