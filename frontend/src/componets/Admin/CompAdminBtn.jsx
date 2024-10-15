import React from 'react'


export default function CompAdminBtn(props) {

  //props: 컴포넌트 함수를 호출할 때 상속받을 속성
  //children: innerHTML(text) 상속받을 때 사용

  //버튼 클릭 시 호출할 함수는 'click'으로 상속
  //<CompAdminBtn 'click'={}>'children'</CompAdminBtn>


  return (  //Customized Button
    <>
      <button className='comp--admin--btn--container' onClick={props.click}>{props.children}</button>
    </>
  )
}
