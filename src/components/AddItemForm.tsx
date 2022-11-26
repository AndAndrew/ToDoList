import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import s from "../TodoList.module.css";
import {UniversalButton} from "./UniversalButton";
import {TextField} from "@mui/material";

type PropsType = {
    label: string,
    callBack: (newTitle: string) => void,
    disabled?: boolean
}

export const AddItemForm = memo((props: PropsType) => {

    const {callBack} = props
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(false);
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false);
        if (event.key === 'Enter') {
            addItemHandler();
        }
    }
    const addItemHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            callBack(newTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={error}
                size='small'
                id="outlined-basic"
                label={error ? "Title is required" : props.label}
                variant="outlined"
                sx={{
                    // "& .MuiInputLabel-root": {color: 'coral'},
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": {borderColor: "coral"},
                    },
                    "& .MuiInputLabel-root.Mui-focused": {color: 'coral'},
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                            borderColor: "coral"
                        }
                    }
                }}
                disabled={props.disabled}/>
            <UniversalButton variant={'outlined'}
                             callBack={addItemHandler}
                             nickName={'+'}
                             disabled={props.disabled}
                             color={'coral'}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
})