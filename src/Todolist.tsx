import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (newTitle: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const filterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button callBack={addTaskHandler} nickName={'+'}/>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked);
                        }
                        return (
                            <li key={t.id}>
                                <Button callBack={() => {removeTaskHandler(t.id)}} nickName={'X'}/>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                            </li>
                        )
                    })}
            </ul>
            <div>
                <Button callBack={() => {filterHandler('All')}} nickName={'All'}/>
                <Button callBack={() => {filterHandler('Active')}} nickName={'Active'}/>
                <Button callBack={() => {filterHandler('Completed')}} nickName={'Completed'}/>
            </div>
        </div>
    )
}