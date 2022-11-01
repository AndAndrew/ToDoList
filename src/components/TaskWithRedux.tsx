import React, {memo} from 'react';
import s from "../TodoList.module.css";
import {UniversalButton} from "./UniversalButton";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {removeTaskTC, updateTaskTC} from "../reducers/tasksReducer";
import {useAppDispatch} from "../app/hooks";
import {TaskStatuses, TaskType} from "../api/todoListAPI";

export type TaskWithReduxPropsType = {
    todoListId: string,
    task: TaskType
}

export const TaskWithRedux = memo(({todoListId, task}: TaskWithReduxPropsType) => {

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
            <UniversalButton variant={'contained'}
                             callBack={() => {
                                 removeTaskHandler()
                             }} nickName={'X'}/>

            <CheckBox isDone={task.status === TaskStatuses.Completed}
                      callBack={changeStatusHandler}/>
            <EditableSpan title={task.title}
                          callBack={(newTitle) => updateTaskHandler(newTitle)}/>
        </li>
    )
});