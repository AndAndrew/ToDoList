import React, {memo} from 'react';
import s from "../TodoList.module.css";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {removeTaskTC, updateTaskTC} from "../reducers/tasksReducer";
import {useAppDispatch} from "../app/hooks";
import {TaskStatuses, TaskType} from "../api/tasksAPI";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@mui/material";
import {RequestStatusType} from "../app/appReducer";

type TaskPropsType = {
    todoListId: string,
    task: TaskType,
    entityStatus: RequestStatusType,
}

export const Task = memo(({todoListId, task, entityStatus}: TaskPropsType) => {

    const dispatch = useAppDispatch();

    const removeTaskHandler = () => dispatch(removeTaskTC(todoListId, task.id));

    const changeStatusHandler = (isDone: boolean) => {
        const status = isDone ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todoListId, task.id, {status}));
    }

    const updateTaskHandler = (newTitle: string) => {
        dispatch(updateTaskTC(todoListId, task.id, {title: newTitle}));
    }

    return (
        <li className={task.status === TaskStatuses.Completed ? s.completed : ''}>
            <CheckBox isDone={task.status === TaskStatuses.Completed}
                      callBack={changeStatusHandler}/>
            <EditableSpan title={task.title}
                          callBack={(newTitle) => updateTaskHandler(newTitle)}/>
            <IconButton aria-label="delete"
                        onClick={removeTaskHandler}
                        disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </li>
    )
});