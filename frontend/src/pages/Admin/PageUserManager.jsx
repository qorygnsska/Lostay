import React, { useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container, Table } from 'react-bootstrap'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'

export default function PageUserManager() {

    //하위요소가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        console.log('fromChild: ' + fromMyChild);
        setText_fromChild(fromMyChild);
    }




    const user1 = {
        user_no: 1,
        user_name: '심재호',
        user_email: 'shim@lostay.com',
        user_phone: '010-1111-1111',
        user_create_at: '24.10.14.',
        user_point: 1200,
        user_status: '탈퇴'
    };

    const user2 = {
        user_no: 2,
        user_name: '박정일',
        user_email: 'qwer@lostay.com',
        user_phone: '010-2222-2222',
        user_create_at: '24.10.14.',
        user_point: 2000,
        user_status: '활동'
    };

    const userList = [user1, user2];
    //map, find, filter, ...




    return (
        <>
            <div className='page--user--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className='d-flex justify-content-end mb-3'>
                        <CompAdminSearch where={'admin-user'} callParent={functionForMyChild} />
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

                            {
                                userList.map(function (user, index) {
                                    return (
                                        <tr key={index}>
                                            <td>{user.user_no}</td>
                                            <td>{user.user_name}</td>
                                            <td>{user.user_email}</td>
                                            <td>{user.user_phone}</td>
                                            <td>{user.user_create_at}</td>
                                            <td>{user.user_point}</td>
                                            <td>{user.user_status}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>

                </Container>
            </div>
        </>
    )
}
