import React from "react";
import {FilterValuesType} from "./App";
import {UniversalButton} from "./components/UniversalButton";
import s from './TodoList.module.css';
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {addTaskAC, removeTaskAC} from "./reducers/tasksReducer";
import {changeFilterAC, removeTodoListAC} from "./reducers/todoListReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    tasks: Array<TaskType>
    changeFilter: (todoListID: string, filterValue: FilterValuesType) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    updateTask: (todoListId: string, taskID: string, newTitle: string) => void
    updateTodoList: (todoListId: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {

    const todo = useSelector<AppRootStateType, TodoListType | undefined>(state => state.todoLists.find(todo => {
        return todo && todo.id === props.todoListID
    }));
    const tasksTodo = useSelector<AppRootStateType, Array<TaskType>>(state => todo ? state.tasks[todo.id] : []);

    const dispatch = useDispatch();

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
        dispatch(removeTaskAC(todoListId, id));
    }

    const changeIsDoneHandler = (taskId: string, isDone: boolean, todoListId: string) => {
        props.changeTaskStatus(taskId, isDone, todoListId);
    }

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(todo ? todo.id : '', newTitle));
    }

    const removeTodoList = () => dispatch(removeTodoListAC(props.todoListID));

    return (
        <div>
            <h3>
                <EditableSpan title={todo ? todo.title : ''} callBack={updateTodoListHandler}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {
                    tasksTodo.map((t) => {
                        return (
                            <li key={t.id} className={t.isDone ? s.isDone : ''}>
                                <UniversalButton variant={'contained'}
                                                 callBack={() => {
                                                     removeTaskHandler(t.id, props.todoListID)
                                                 }} nickName={'X'}/>

                                <CheckBox isDone={t.isDone}
                                          callBack={(isDone) => changeIsDoneHandler(t.id, isDone, props.todoListID)}/>
                                <EditableSpan title={t.title}
                                              callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
                            </li>
                        )
                    })}
            </ul>
            <div>
                <UniversalButton variant={'contained'} className={props.filter === 'All' ? s.activeFilter : ''}
                                 callBack={() => {
                                     filterHandler('All')
                                 }}
                                 nickName={'all'}/>
                <UniversalButton variant={'contained'} className={props.filter === 'Active' ? s.activeFilter : ''}
                                 callBack={() => {
                                     filterHandler('Active')
                                 }}
                                 nickName={'active'}/>
                <UniversalButton variant={'contained'} className={props.filter === 'Completed' ? s.activeFilter : ''}
                                 callBack={() => {
                                     filterHandler('Completed')
                                 }}
                                 nickName={'completed'}/>
            </div>
        </div>
    );
}