import React, {memo, useCallback} from 'react';
import {TaskType} from "../TodoList";
import s from "../TodoList.module.css";
import {UniversalButton} from "./UniversalButton";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../reducers/tasksReducer";

export type TaskWithReduxPropsType = {
    todoListId: string,
    task: TaskType
}

export const TaskWithRedux = memo(({todoListId, task}: TaskWithReduxPropsType) => {

    const dispatch = useDispatch();

    const removeTaskHandler = () => dispatch(removeTaskAC(todoListId, task.id));

    const changeIsDoneHandler = (isDone: boolean) => dispatch(changeTaskStatusAC(todoListId, task.id, isDone));

    const updateTaskHandler = (newTitle: string) => dispatch(updateTaskAC(todoListId, task.id, newTitle));

    return (
        <li className={task.isDone ? s.isDone : ''}>
            <UniversalButton variant={'contained'}
                             callBack={() => {
                                 removeTaskHandler()
                             }} nickName={'X'}/>

            <CheckBox isDone={task.isDone}
                      callBack={(isDone) => changeIsDoneHandler(isDone)}/>
            <EditableSpan title={task.title}
                          callBack={(newTitle) => updateTaskHandler(newTitle)}/>
        </li>
    )
});