import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type PropsType = {
    title: string
    callBack: (newTitle:string) => void
}

export const EditableSpan = memo((props: PropsType) => {
    console.log("EditableSpan");
    const{title, callBack} = props
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }

    const addTitle = () => {
        if (newTitle.trim() !== '') {
            callBack(newTitle);
        }
    }

    const toggleHandler = () => {
        setEdit(!edit)
        addTitle()
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            toggleHandler()
        }
    }

    return (
        edit
            ? <input onKeyDown={onKeyDownHandler} onBlur={toggleHandler} onChange={onChangeHandler} autoFocus value={newTitle}/>
            : <span onDoubleClick={toggleHandler}>{props.title}</span>
    )
})