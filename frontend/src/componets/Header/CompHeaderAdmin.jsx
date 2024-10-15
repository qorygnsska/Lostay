import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';

export default function CompHeaderAdmin() {

    const location = useLocation();//url 정보 가져오기

    const selectedLink = location.pathname.toString();
    //console.log(`selectedNavItem: ${selectedLink}`);

    //console.log(location.search);//url에서 parameter가져오기 cf.useParams()
    
    
    const handleLogout = (elem) => {    //#btn_logout 클릭 시 : 관리자 로그아웃
        
        //console.log(elem);
        console.log('click_logout_admin');
        
    }


    return (
        <>
            <Navbar className='comp--header--admin--container' bg="secondary" data-bs-theme="dark">
                <Container id='container_navbar'>

                    {/* 부트스트랩 기존 컴포넌트 vs React-router 'Link' 컴포넌트 */}


                    {/* <Navbar.Brand id="brand_navbar_admin" href="/admin-home">로스테이_관리자</Navbar.Brand> */}
                    <Link to="/admin-home" id="brand_navbar_admin" className="navbar-brand">로스테이_관리자</Link>

                    <Nav variant="underline" >

                        <Nav.Item>
                            {/* <Nav.Link href="/admin-event" className={`${selectedLink=="/admin-event"?"active":""}`} >이벤트</Nav.Link> */}
                            <Link to="/admin-event" className={`nav-link ${selectedLink=="/admin-event"?"active":""}`}>이벤트</Link>
                        </Nav.Item>

                        <Nav.Item>
                            {/* <Nav.Link href="/admin-review" className={`${selectedLink =="/admin-review"?"active":""}`} >리뷰</Nav.Link> */}
                            <Link to="/admin-review" className={`nav-link ${selectedLink=="/admin-review"?"active":""}`}>리뷰</Link>

                        </Nav.Item>

                        <Nav.Item>
                            {/* <Nav.Link href="/admin-user" className={`${selectedLink=="/admin-user"?"active":""}`} >회원</Nav.Link> */}
                            <Link to="/admin-user" className={`nav-link ${selectedLink=="/admin-user"?"active":""}`}>회원</Link>
                        </Nav.Item>

                        <Nav.Item id="btn_container">
                            <Button id="btn_logout" variant="outline-dark" size="sm" type="button" onClick={handleLogout}>로그아웃</Button>
                            {/* onclick={함수명()} : 렌더링 시(클릭할 때가 아니라) 함수가 호출됨, 함수명만 써준다!! */}
                        </Nav.Item>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
