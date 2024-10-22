import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function CompHeaderAdmin() {

    //const location = useLocation();//url 정보 가져오기
    //const selectedLink = location.pathname.toString();
    //console.log(`selectedNavItem: ${selectedLink}`);

    //console.log(location.search);//url에서 parameter가져오기
    // cf. useParams() : page event detail에 있음


    const [time, setTime] = useState(new Date());

    setInterval(() => {
        setTime(new Date());
    }, 1000);
    //   //setInterval(1st, 2nd)
    //   //args-1st: 실행할 함수, setTime()
    //   //args-2nd: 시간차, 1000ms


    
    const [clock, setClock] = useState(new Date());

    useEffect(() => {

        const tick = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return (() => clearInterval(tick))

    }, []);

    //useEffect(1st, 2nd)
    //args-1st: function
    // return : 클린업 함수

    //args-2nd: dependency
    // 생략: 리렌더링될 때마다 실행
    // [] (빈배열): 처음 마운트될 때만 실행
    // [x] : x이 update될 때 실행



    const handleLogout = () => {    //#btn_logout 클릭 시 : 관리자 로그아웃
        
        if(window.confirm('정말 로그아웃?')) {
            console.log('로그아웃 실행');
            
        }
    }


    return (
        <>
            <Navbar className='comp--header--admin--container' bg="secondary" data-bs-theme="dark">
                <Container id='container_navbar_admin'>

                    {/* 부트스트랩 'Nav.Link'(a)  vs  React-router 'Link'(a) 컴포넌트  vs  React-router 'NavLink'(a) 컴포넌트*/}

                    {/* <Navbar.Brand id="brand_navbar_admin" href="/admin-home">로스테이_관리자</Navbar.Brand> */}
                    <Link to="/admin-home" id="brand_navbar_admin" className="navbar-brand">로스테이_관리자</Link>

                    {/* useState */}
                    <p className='mb-0'>{time.toLocaleString()}</p>
                    
                    {/* useEffect */}
                    <p className='mb-0'>{clock.toLocaleString()}</p>


                    <Nav variant="underline" >

                        <Nav.Item>
                            {/* <Nav.Link href="/admin-event" className={`${selectedLink=="/admin-event"?"active":""}`} >이벤트</Nav.Link> */}
                            {/* <Link to="/admin-event" className={`nav-link ${selectedLink=="/admin-event"?"active":""}`}>이벤트</Link> */}
                            <NavLink to="/admin-event" className="nav-link" >이벤트</NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            {/* <Nav.Link href="/admin-review" className={`${selectedLink =="/admin-review"?"active":""}`} >리뷰</Nav.Link> */}
                            {/* <Link to="/admin-review" className={`nav-link ${selectedLink=="/admin-review"?"active":""}`}>리뷰</Link> */}
                            <NavLink to="/admin-review" className="nav-link" >리뷰</NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            {/* <Nav.Link href="/admin-user" className={`${selectedLink=="/admin-user"?"active":""}`} >회원</Nav.Link> */}
                            {/* <Link to="/admin-user" className={`nav-link ${selectedLink=="/admin-user"?"active":""}`}>회원</Link> */}
                            <NavLink to="/admin-user" className="nav-link" >회원</NavLink>
                        </Nav.Item>

                        <Nav.Item id="btn_container">
                            <Button id="btn_logout" variant="outline-dark" size="sm" type="button" onClick={handleLogout}>로그아웃</Button>
                            {/* onclick={함수명()} : 렌더링 시(클릭할 때가 아니라) 함수가 호출됨, 클릭할 때만 실행하려면 함수명만 써준다!! */}
                        </Nav.Item>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
