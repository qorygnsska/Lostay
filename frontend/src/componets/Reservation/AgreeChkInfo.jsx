import React, { useState } from "react";
import { MdOutlineCheckBox, MdCheck } from "react-icons/md";
import AgreeDetailModal from "./AgreeDetailModal";

export default function AgreeChkInfo({ agreeChkInfo, checkItems, handleSingleCheck, handleAllCheck }) {
    const [modalShow, setModalShow] = useState(false);
    const [detailData, setDetailData] = useState([]);

    const handleModalShow = (data) => {
        setModalShow(true); // 모달 열기
        setDetailData(data);
    };

    return (
        <div className="agreeChkInfo--container">
            <div className="select--all--wrap">
                <input
                    type="checkbox"
                    name="select-all"
                    id="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                    checked={checkItems.length === agreeChkInfo.length}
                />
                <label htmlFor="select-all">
                    <div className="select--all--box">
                        <MdOutlineCheckBox className={`select--all--icon ${checkItems.length === agreeChkInfo.length ? "checked" : ""}`} />
                        <span>전체동의</span>
                    </div>
                </label>
            </div>
            <div className="select--wrap">
                {agreeChkInfo?.map((data) => (
                    <div key={data.id}>
                        <div className="select--box">
                            <input
                                type="checkbox"
                                name={`select-${data.id}`}
                                id={`select--${data.id}`}
                                onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={checkItems.includes(data.id) ? true : false}
                            />
                            <label htmlFor={`select--${data.id}`}>
                                <div className="select--info">
                                    <MdCheck className={`icon ${checkItems.includes(data.id) ? "checked" : ""}`} />
                                    {data.title}
                                </div>
                            </label>

                            <div className="detail--info">{data?.content ? <div onClick={() => handleModalShow(data)}>보기</div> : null}</div>
                        </div>
                    </div>
                ))}
            </div>
            <AgreeDetailModal onClose={() => setModalShow(false)} modalShow={modalShow} detailData={detailData} />
        </div>
    );
}
