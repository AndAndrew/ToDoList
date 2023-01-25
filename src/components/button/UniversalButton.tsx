import React from "react";
import {Button} from "@mui/material";
import {buttonStyle} from "./buttonMuiStyles";

type ButtonPropsType = {
    variant?: any,
    backgroundColor?: string,
    color?: string,
    callBack: () => void,
    nickName: string,
    disabled?: boolean,
}

export const UniversalButton = (props: ButtonPropsType) => {

    const {variant, backgroundColor, color, callBack, nickName, disabled} = props
    const onClickHandler = () => {
        callBack()
    }

    return (
        <Button variant={variant}
                onClick={onClickHandler}
                disabled={disabled}
                size='small'
                style={{...buttonStyle,
                    backgroundColor: backgroundColor,
                    color: color,
                }}>{nickName}</Button>
    );
}