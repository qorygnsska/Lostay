import React from "react";

export default function PayType({ payType }) {
    return (
        <>
            {payType?.disImage ? (
                <div>
                    <img src={payType.disImage} alt={payType.disCategory} className="icon" />
                </div>
            ) : (
                <div>
                    <span>{payType.disCategory}</span>
                </div>
            )}
            {payType?.disRate ? (
                payType.disRate > 0 ? (
                    <span className="platform--site--sale--box">
                        <span className="platform-site-sale--icon">혜택</span>
                    </span>
                ) : null
            ) : null}
        </>
    );
}
