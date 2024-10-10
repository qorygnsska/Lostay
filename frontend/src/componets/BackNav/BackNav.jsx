import { FaChevronLeft } from "react-icons/fa6";
import "./BackNav.css"

import React from 'react'
import { useNavigate } from "react-router-dom";

export default function BackHistory({ title }) {

    const navigate = useNavigate();


    return (
        <div>
            <div className="back-history-wrap">
                <button onClick={() => navigate(-1)}>
                    <FaChevronLeft className="icon" />
                </button>

                <span>{title}</span>
                <div className="none"></div>
            </div>
        </div>

    )
}
