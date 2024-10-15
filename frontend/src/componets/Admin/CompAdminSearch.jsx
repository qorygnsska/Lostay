import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { CiSearch } from 'react-icons/ci'

export default function CompAdminSearch(props) { //props: 상위요소에게서 받아온 유산

  //내가(하위 요소) 만들어서 쓸 변수
  const [text_search, setText_search] = useState('');


  const handleKey = (event) => {  //엔터키 누르면 #btn_search 클릭 실행
    //console.log(event.target.value);
    if(event.key === 'Enter') {
      handleClick();  
    }
  }

  const handleSubmit = (event) => { //엔터키 누르면 제출(page reload) 방지
    event.preventDefault();   
  }


  const handleClick = () => {
    console.log('click_btn_search //where: ' + props.where);  //어느페이지에서 눌렀는지 확인

    if (text_search == '') {
      handleNull();
    } else {
      handleSearch();
    }
    //내가 할 꺼 다 하고

    //상위요소에게 값을 넘겨주기 위해 상위요소를 부름
    props.callParent(text_search)

  }


  const handleNull = () => {  //모든 값 가져오기?
    console.log('input_nothing');
  }

  const handleSearch = () => {  //검색 필터링
    console.log('input_something');
  }


  return (
    <>
      <Form className="comp--admin--search--container" onKeyUp={handleKey} onSubmit={handleSubmit} >
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          id="input_search"
          value={text_search}
          onChange={(event) => { setText_search(event.target.value) }}
        />
        <Button id="btn_search" onClick={handleClick} variant="outline-primary" size="sm"><CiSearch size="24" /></Button>
        {/* onClick={text_search!=''?handleSearch:null} */}
      </Form>
    </>
  )
}
