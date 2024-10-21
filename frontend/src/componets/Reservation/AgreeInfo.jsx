import React from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export default function agree({ agreeInfo }) {
    return (
        <div className="agreeinfo--container">
            {agreeInfo.map((info) => (
                <div key={info.id} className="agreeinfo--box">
                    <BsFillExclamationCircleFill className="icon" />
                    <div className="agreeinfo">
                        <span>{info.title}</span>
                        <span className="info--content">{info.content}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
