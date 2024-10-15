import React from 'react'


export default function CompAdminBtn(props) {

  //props: 컴포넌트 함수를 호출할 때 상속해 줄 속성
  //children: innerHTML(text) 넘겨줄 때 사용

  //버튼 클릭 시 호출할 함수는 'click'으로 지정
  //<CompAdminBtn 'click'={}>'children'</CompAdminBtn>


  return (  //Customized Button
    <>
      <button className='comp--admin--btn--container' onClick={props.click}>{props.children}</button>
    </>
  )
}
