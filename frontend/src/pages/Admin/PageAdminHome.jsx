import React, { useEffect, useState } from 'react'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Container } from 'react-bootstrap'
import CompHeaderGeneral from '../../componets/Header/CompHeaderGeneral';
import CompSearchBox from '../../componets/Search/CompSearchBox';

export default function PageAdminHome() {


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
  // [val] : val이 update될 때 실행



  ////////////////////////////////////////
  const place = '제주도';
  const check_in = '10월 9일';
  const check_out = '10월 11일';
  const member = 2;
  ////////////////////////////////////////

  // searchBox(Modal)이 열렸니?
  const [searchBoxShow, setSearchBoxShow] = useState(false);

  // 어디서 모달 불렀니?
  const functionFromWhere = (fromWhere) => {
    console.log('where are you?: ' + fromWhere);
  }

  // 어떤 input 눌렀니?
  const functionSearchPicker = (fromMyChild) => {
    console.log(fromMyChild + ' is picked');
    setSearchBoxShow(true);
  }
  ////////////////////////////////////////

  


  return (
    <>
      <div className='page--admin--home--container page--admin'>
        <CompHeaderAdmin />

        <Container id='section_container'>
          <p>{time.toLocaleString()}</p>

          <p>{clock.toLocaleString()}</p>


          {/* header w/ searchParam */}
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
            onHide={() => {setSearchBoxShow(false)}}
            place={place}
            check_in={check_in}
            check_out={check_out}
            member={member}
          />
          

        </Container>
      </div>
    </>
  )
}
