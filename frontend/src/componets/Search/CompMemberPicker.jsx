import React, { useState } from 'react'

export default function CompMemberPicker(props) {

    const [member, setMember] = useState(parseInt(props.member));




    const confirmMember = (event) => {
        event.preventDefault();
        //'변경'버튼 클릭으로 인한 상위 페이지 form 제출 방지
        //또는 '변경' 버튼에 type="button"으로 지정
        //console.log('confim member: ' +member);
        props.callParent(member);   //상위 SearchBox모달에 member 전달하고
        props.confirmMember();  //CompMemberPicker숨기기
    }

    return (
        <>
            <div className={`comp--member--picker--container ${props.hidden?"d-none":""}`}>
                <p>now you see me!</p>

                <button type="button" onClick={() => setMember(member>2?member-1:2)}>뺴기</button>
                <p>member: {member}명</p>
                <button type="button" onClick={() => setMember(member<10?member+1:10)}>더하기</button>

                <button onClick={confirmMember}>변경</button>
            </div>
        </>
    )
}
