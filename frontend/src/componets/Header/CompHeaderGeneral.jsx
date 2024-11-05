import { Container, Form, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function CompHeaderGeneral(props) {

    //클릭이 일어난 location(path)
    const whereAmI = useLocation().pathname.toString();

    //기간 계산(소수점 나오면 setHours(0,0,0,0) 필요)
    const period = (props.check_out.getTime() - props.check_in.getTime()) / (24 * 60 * 60 * 1000);

    // Date() -> "yyyy/MM/dd" (날짜 형식 -> 텍스트 형식 변환 함수)
    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString() + "/" + rawDate.getDate().toString());

    //클릭이 일어난 input 태그
    const handleClick = (event) => {
        props.where(whereAmI);
        props.callParent(event.target.id.toString())    //상위요소에 input 태그의 id 전달(포커스 주기 위해)
    }

    return (
        <>
            <Navbar className="comp--header--general--container">
                <Container id='container_navbar_general'>

                    <Container id='container_search_param'>
                        <Form.Control
                            id="input_place"
                            className="focus-ring focus-ring-danger border border-danger-subtle"
                            type="text"
                            placeholder="Place"
                            readOnly
                            value={props.place}
                            onClick={handleClick}   //클릭 시 실행할 함수
                        />
                        <Form.Control
                            id="input_period"
                            className="focus-ring focus-ring-danger border border-danger-subtle"
                            type="text"
                            placeholder="Period"
                            readOnly
                            value={dateFormatter(props.check_in) + ' - ' + dateFormatter(props.check_out) + ' (' + period + '박)'}
                            onClick={handleClick}
                        />
                        <Form.Control
                            id="input_member"
                            className="focus-ring focus-ring-danger border border-danger-subtle"
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
