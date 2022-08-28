import React from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from './TodoList.module.css';
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    changeFilter: (todoListID: string, filterValue: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    updateTask: (todoListId: string, taskID: string, newTitle: string) => void
    updateTodoList: (todoListId: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {

    const filterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.todoListID, filterValue);
    }

    const updateTodoListHandler = (newTitle: string) => {
        props.updateTodoList(props.todoListID, newTitle);
    }

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        props.updateTask(props.todoListID, taskId, newTitle);
    }

    const removeTaskHandler = (id: string, todoListId: string) => {
        props.removeTask(id, todoListId);
    }

    const changeIsDoneHandler = (taskId: string, isDone: boolean, todoListId: string) => {
        props.changeTaskStatus(taskId, isDone, todoListId);
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.todoListID);
    }

    const removeTodoList = () => props.removeTodoList(props.todoListID);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={updateTodoListHandler}/>
            <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {
                    props.tasks.map((t) => {
                        return (
                            <li key={t.id} className={t.isDone ? s.isDone : ''}>
                                <Button callBack={() => {
                                    removeTaskHandler(t.id, props.todoListID)
                                }} nickName={'X'}/>

                                <CheckBox isDone={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone, props.todoListID)}/>
                                <EditableSpan title={t.title} callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
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
    );
}