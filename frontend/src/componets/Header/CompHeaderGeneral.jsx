import { Container, Form, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function CompHeaderGeneral(props) {

 
    //클릭이 일어난 location(path)
    const whereAmI = useLocation().pathname.toString();

    const handleClick = (event) => {    //클릭이 일어난 input 태그

        props.where(whereAmI);
        props.callParent(event.target.id)    //상위요소에 input 태그의 id 전달
    }
    

    return (
        <>
            <Navbar className="comp--header--general--container">
                <Container id='container_navbar_general'>

                    {/* 로고 필요하면 살리기!!!!!!!!!!!
                    <div className='logo'>
                        <h1>로스테이</h1>
                    </div> */}

                    <Container id='container_search_param'>
                        <Form.Control
                            id="input_place"
                            type="text"
                            placeholder="Place"
                            readOnly
                            value={props.place}
                            onClick={handleClick}   //클릭 시 실행할 함수
                        />
                        <Form.Control
                            id="input_period"
                            type="text"
                            placeholder="Period"
                            readOnly
                            value={props.check_in + ' - ' + props.check_out}
                            onClick={handleClick}
                        />
                        <Form.Control
                            id="input_member"
                            type="text"
                            placeholder="Member"
                            readOnly
                            value={props.member + '명'}
                            onClick={handleClick}
                        />
                    </Container>
                </Container>

            </Navbar>
        </>
    )
}
