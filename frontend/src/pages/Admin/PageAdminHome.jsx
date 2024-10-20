import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container } from 'react-bootstrap'
import CompHeaderGeneral from '../../componets/Header/CompHeaderGeneral';
import CompSearchBox from '../../componets/Search/CompSearchBox';

export default function PageAdminHome() {

  ////////////////////////////////////////
  const place = '제주도';
  const today = new Date(); //오늘 날짜
  const check_in = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1
  const check_out = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1 + 1
  const member = 4;
  ////////////////////////////////////////

  // searchBox(Modal)이 열렸니?
  const [searchBoxShow, setSearchBoxShow] = useState(false);

  // 어디서 모달 불렀니?
  const functionFromWhere = (fromWhere) => {
    console.log('where are you?: ' + fromWhere);
  }

  // Header에서 어떤 input 눌렀니?
  const [focus, setFocus] = useState('input_place');

  const functionSearchPicker = (fromMyChild) => {
    console.log(fromMyChild + ' is picked at headerGeneral');
    //선택 위치에 따라 focus 변경 -> 하위 모달에 focus 전달
    setFocus(fromMyChild);
    setSearchBoxShow(true);
  }
  ////////////////////////////////////////


  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <Container id='section_container'>

          {/* header w/ searchParams */}
          <CompHeaderGeneral
            where={functionFromWhere}
            callParent={functionSearchPicker}
            place={place}
            check_in={check_in}
            check_out={check_out}
            member={member}
          />

          {/* searchBox(Modal) */}
          <CompSearchBox
            show={searchBoxShow}
            onHide={() => { setSearchBoxShow(false) }}
            place={place}
            check_in={check_in}
            check_out={check_out}
            member={member}
            focus={focus}
          />

        </Container>
      </div>
    </>
  )
}
