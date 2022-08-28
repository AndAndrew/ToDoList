import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../TodoList.module.css";
import {Button} from "./Button";

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const {callBack} = props
    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(null);
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            callBack(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }

    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? s.error : ''}
            />
            <Button callBack={addTaskHandler} nickName={'+'}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}