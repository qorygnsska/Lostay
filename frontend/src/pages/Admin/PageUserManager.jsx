import React from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'

export default function PageUserManager() {
    return (
        <>
            <div className='page--user--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className='d-flex justify-content-end mb-3'>
                        <CompAdminSearch/>
                    </div>

                    <Table striped bordered hover id='table_entire_user'>
                        <thead id="table_header">
                            <tr>
                                <th>#</th>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>가입일</th>
                                <th>포인트</th>
                                <th>계정 상태</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            <tr>
                                <td>1</td>
                                <td>이름1</td>
                                <td>email1@test1.com</td>
                                <td>010-0000-0000</td>
                                <td>24.10.14.</td>
                                <td>1,200P</td>
                                <td>활동(or탈퇴)</td>
                            </tr>
                        </tbody>
                    </Table>

                </Container>
            </div>
        </>
    )
}
