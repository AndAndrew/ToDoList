import React from "react";

type ButtonPropsType = {
    callBack: () => void,
    nickName: string,
    className?: string
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button className={props.className} onClick={onClickHandler}>{props.nickName}</button>
    );
}