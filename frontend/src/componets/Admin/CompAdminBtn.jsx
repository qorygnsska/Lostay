import React from 'react'


export default function CompAdminBtn(props) {

  //props: 컴포넌트 함수를 호출할 때 상속받을 속성
  //children: innerHTML(text) 상속받을 때 사용


  function clickhandler() {
    console.log(props.whoAreYou + " no: " + props.no);
    //버튼 클릭 시 호출할 함수는 'callParent'으로 상속
    //<CompAdminBtn 'callParent'={}>'children'</CompAdminBtn>

    // 이벤트 '수정' 버튼 클릭 시
    if (props.whoAreYou === 'update_event') {

      props.callParent(props.no); //CompEventUpdater에서 처리하도록 전달

      // 이벤트 '삭제' 버튼 클릭 시
    } else if (props.whoAreYou === 'delete_event') {

      if (window.confirm('정말 삭제하시겠습니까?')) {
        deleteEvent();
      }

      // 리뷰 '숨김' 버튼 클릭 시
    } else if (props.whoAreYou === 'hide_review') {
      if (window.confirm('정말 비공개로 전환하시겠습니까?')) {
        hideReview();
      }
    }
  }

  // 이벤트 '삭제' 버튼 클릭 시
  async function deleteEvent() {
    try {
      // async function & await fetch : 'synchronous' request-response pair
      const response = await fetch(`http://localhost:9090/adminEvent/${props.no}`, { method: 'DELETE' });

      if (response.ok) {
        alert('이벤트를 정상적으로 삭제했습니다.');
        window.location.href = "/admin-event"; //refreshing window
      } else {
        console.log(response);
        alert('서버와 통신이 원활하지 않습니다.');
      }

    } catch (error) {
      console.log(error);
      alert('서버와 통신이 원활하지 않습니다.');
    }
  }

  // 리뷰 '숨김' 버튼 클릭 시
  async function hideReview() {

    //axios&then으로 처리
    console.log('안녕');

  }

  
  return (  //Customized Button
    <>
      <button className='comp--admin--btn--container' onClick={clickhandler}>{props.children}</button>
    </>
  )
}