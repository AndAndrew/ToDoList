import React, {ChangeEvent} from "react";
import {Checkbox} from "@mui/material";

type PropsType = {
    isDone: boolean,
    callBack: (isDone: boolean) => void,
}

export const CheckBox = ({isDone, callBack}: PropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }

    return (
        <Checkbox size="small"
                  onChange={onChangeHandler}
                  checked={isDone}
                  color={'warning'}/>
    );
}