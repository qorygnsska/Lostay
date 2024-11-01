import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import CompAdminSearch from '../../componets/Admin/CompAdminSearch';


export default function PageAdminHome() {

  //하위요소(검색창)가 넘겨줄 값을 담을 변수
  const [text_fromChild, setText_fromChild] = useState('');

  //하위요소(검색창)가 값을 넘겨주면 실행할 함수
  const functionForMyChild = (fromMyChild) => {
    //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
    //console.log('text_fromChild: ' + text_fromChild);   //previousState
    //console.log('fromChild: ' + fromMyChild);
    setText_fromChild(fromMyChild);
  }

  //검색어 필터 결과
  const [txt_result, setTxt_result] = useState('');

  const getSearchFilter = async () => {

    await axios.get(`http://localhost:9090/es/searchToken?searchVal=${text_fromChild}`)
      .then(response => {
        console.log('response: ' + response);
        console.log('response.ok: ' + response.ok);
        console.log('response.status: ' + response.status);        
        setTxt_result(response.data.toString());
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getSearchFilter();
  }, [text_fromChild]);

  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <Container id='section_container'>

          <CompAdminSearch where={'admin-event'} callParent={functionForMyChild} />

          <p>{txt_result}</p>

        </Container>
      </div>
    </>
  )
}