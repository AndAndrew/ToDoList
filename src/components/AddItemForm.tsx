import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../TodoList.module.css";
import {UniversalButton} from "./UniversalButton";
import {TextField} from "@mui/material";

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const {callBack} = props
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(false);
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setError(false);
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            callBack(newTitle);
            setTitle('');
        } else {
            setError(true);
        }

    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       className={error ? s.error : ''}*/}
            {/*/>*/}
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={error}
                size='small'
                id="outlined-basic"
                label={error ? "Title is required" : "Add title"}
                variant="outlined" />
            <UniversalButton variant={'contained'} callBack={addTaskHandler} nickName={'+'}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}