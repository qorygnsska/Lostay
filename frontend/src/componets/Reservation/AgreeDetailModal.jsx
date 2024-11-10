import React from "react";
import { Modal } from "react-bootstrap";

export default function AgreeDetailModal({ modalShow, onClose, detailData }) {
    const content = detailData.content || [];

    return (
        <Modal show={modalShow} className="agree--detail--modal--container" onHide={onClose} fullscreen={true}>
            {/* 모달 내용 추가 */}
            <Modal.Header closeButton>
                <Modal.Title className="title">{detailData.title ? detailData.title.replace("[필수] ", "") : null}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Array.isArray(content) && content.length > 0
                    ? content.map((data, index) => (
                        <ul key={index}>
                            <li key={data.id} className="textList">
                                {data.text}
                            </li>
                        </ul>
                    ))
                    : null}
            </Modal.Body>
        </Modal>
    );
}
