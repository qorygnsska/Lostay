import React from "react";

export default function PayType({ method }) {
    return (
        <>
            {method?.imageUrl ? (
                <div>
                    <img src={`eventList/${method.imageUrl}`} alt={method.name} className="icon" />
                </div>
            ) : (
                <div>
                    <span>{method.name}</span>
                </div>
            )}
            {method?.sale ? (
                method.sale > 0 ? (
                    <span className="platform--site--sale--box">
                        <span className="platform-site-sale--icon">혜택</span>
                    </span>
                ) : null
            ) : null}
        </>
    );
}
