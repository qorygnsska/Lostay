import React from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'

export default function PageReviewManager() {
    return (
        <>
            <div className='page--review--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className='d-flex justify-content-end mb-3'>
                        <CompAdminSearch/>
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
                                    <CompAdminBtn >삭제</CompAdminBtn>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                </Container>
            </div>
        </>
    )
}
