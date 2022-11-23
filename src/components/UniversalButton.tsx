import React from "react";
import {Button} from "@mui/material";

type ButtonPropsType = {
    variant?: any,
    callBack: () => void
    nickName: string
    className?: string
    disabled?: boolean
}

export const UniversalButton = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <Button variant={props.variant}
                onClick={onClickHandler}
                disabled={props.disabled}
                size='small'
                style={{
                    maxWidth: '250px',
                    maxHeight: '38px',
                    minWidth: '38px',
                    minHeight: '38px',
                    backgroundColor: 'coral'
                }}>{props.nickName}</Button>
    );
}