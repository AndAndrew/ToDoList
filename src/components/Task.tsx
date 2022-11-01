import s from "../TodoList.module.css";
import {UniversalButton} from "./UniversalButton";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import React, {memo, useCallback} from "react";
import {TaskStatuses, TaskType} from "../api/todoListAPI";

type TaskPropsType = {
    task: TaskType,
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void,
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = memo(({
                              changeTaskTitle,
                              ...props
                          }: TaskPropsType) => {

    const removeTaskHandler = () => props.removeTask(props.task.id);

    const changeIsDoneHandler = (status: TaskStatuses) => props.changeTaskStatus(props.task.id, status);

    const updateTaskHandler = useCallback((newTitle: string) => {
        changeTaskTitle(props.task.id, newTitle)
    }, [changeTaskTitle, props.task.id]);

    return (
        <li className={props.task.status === TaskStatuses.Completed ? s.completed : ''}>
            <UniversalButton variant={'contained'}
                             callBack={() => {
                                 removeTaskHandler()
                             }} nickName={'X'}/>

            <CheckBox isDone={props.task.status === TaskStatuses.Completed}
                      callBack={(isDone) => changeIsDoneHandler(isDone ? TaskStatuses.Completed : TaskStatuses.New)}/>
            <EditableSpan title={props.task.title}
                          callBack={(newTitle) => updateTaskHandler(newTitle)}/>
        </li>
    )
})