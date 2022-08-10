import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from './TodoList.module.css';
import {CheckBox} from "./components/CheckBox";

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
    filter: FilterValuesType
}

export const TodoList = (props: PropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [filterValue, setFilterValue] = useState<FilterValuesType>('All');

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }

    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(null);
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    }

    const filterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
        setFilterValue(filterValue);
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id);
    }

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => {
        props.changeStatus(taskId, isDone);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? s.error : ''}
                />
                <Button callBack={addTaskHandler} nickName={'+'}/>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ul>
                {
                    props.tasks.map((t) => {

                        return (
                            <li key={t.id} className={t.isDone ? s.isDone : ''}>
                                <Button callBack={() => {
                                    removeTaskHandler(t.id)
                                }} nickName={'X'}/>

                                <CheckBox isDone={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}/>
                                <span>{t.title}</span>
                            </li>
                        )
                    })}
            </ul>
            <div>
                <Button className={props.filter === 'All' ? s.activeFilter : ''}
                        callBack={() => {
                            filterHandler('All')
                        }}
                        nickName={'all'}/>
                <Button className={props.filter === 'Active' ? s.activeFilter : ''}
                        callBack={() => {
                            filterHandler('Active')
                        }}
                        nickName={'active'}/>
                <Button className={props.filter === 'Completed' ? s.activeFilter : ''}
                        callBack={() => {
                            filterHandler('Completed')
                        }}
                        nickName={'completed'}/>
            </div>
        </div>
    )
}