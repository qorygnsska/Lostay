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
            <div className={`comp--member--picker--container ${props.hidden ? "d-none" : ""}`}>
                <h5>인원을 설정해주세요.</h5>
                <div className="container d-flex">
                    <div id="container_member_notice" className="container">
                        <p id="subtitle_member">인원</p>
                        <p id="notice_member">유아 및 아동도 인원수에 포함해주세요.</p>
                    </div>
                    <div className="container d-flex flex-column">
                        <div id="container_member_picker"  className="container d-flex justify-content-end">
                            <button type="button" className="btn_member_pick" disabled={member<=1?true:false} onClick={() => setMember(member>1?member-1:1)}>-</button>
                            <p id="howMany">{member}</p>
                            <button type="button" className="btn_member_pick" disabled={member>=10?true:false} onClick={() => setMember(member<10?member+1:10)}>+</button>
                        </div>
                        <button id="btn_member_confirm" onClick={confirmMember}>변경</button>
                    </div>
                </div>

            </div>
        </>
    )
}
