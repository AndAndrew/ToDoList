import s from "../TodoList.module.css";
import {UniversalButton} from "./UniversalButton";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import React, {memo, useCallback} from "react";
import {TaskType} from "../TodoList";

type TaskPropsType = {
    task: TaskType,
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, status: boolean) => void,
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = memo(({
                              changeTaskTitle,
                              ...props
                          }: TaskPropsType) => {

    const removeTaskHandler = () => props.removeTask(props.task.id);

    const changeIsDoneHandler = (isDone: boolean) => props.changeTaskStatus(props.task.id, isDone);

    const updateTaskHandler = useCallback((newTitle: string) => {
        changeTaskTitle(props.task.id, newTitle)
    }, [changeTaskTitle, props.task.id]);

    return (
        <li className={props.task.isDone ? s.isDone : ''}>
            <UniversalButton variant={'contained'}
                             callBack={() => {
                                 removeTaskHandler()
                             }} nickName={'X'}/>

            <CheckBox isDone={props.task.isDone}
                      callBack={(isDone) => changeIsDoneHandler(isDone)}/>
            <EditableSpan title={props.task.title}
                          callBack={(newTitle) => updateTaskHandler(newTitle)}/>
        </li>
    )
})