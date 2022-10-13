import React, {memo, useCallback, useMemo} from "react";
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
import {Task} from "./components/Task";
import {TaskWithRedux} from "./components/TaskWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string,
    tasks: Array<TaskType>,
    changeFilter: (todoListID: string, filterValue: FilterValuesType) => void,
    removeTask: (todoListID: string, taskId: string) => void,
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void,
    filter: FilterValuesType,
    updateTask: (todoListId: string, taskID: string, newTitle: string) => void,
    updateTodoList: (todoListId: string, newTitle: string) => void
}

export const TodoList = memo((props: PropsType) => {

    const todo = useSelector<AppRootStateType, TodoListType | undefined>(state => state.todoLists.find(todo => {
        return todo && todo.id === props.id
    }));

    const dispatch = useDispatch();

    const filterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.id, filterValue);
    }

    const updateTodoListHandler = useCallback((newTitle: string) => {
        props.updateTodoList(props.id, newTitle);
    }, [props.updateTodoList, props.id]);

    // const updateTaskHandler = useCallback((taskId: string, newTitle: string) => {
    //     props.updateTask(props.todoListID, taskId, newTitle);
    // }, [props.updateTask, props.todoListID])
    //
    // const removeTaskHandler = (id: string, todoListId: string) => {
    //     dispatch(removeTaskAC(todoListId, id));
    // }
    //
    // const changeIsDoneHandler = (taskId: string, isDone: boolean, todoListId: string) => {
    //     props.changeTaskStatus(taskId, isDone, todoListId);
    // }
    const removeTask = useCallback((taskId: string) => {
        props.removeTask(props.id, taskId)
    }, [props.id, props.removeTask]);

    const changeTaskStatus = useCallback((taskId: string, status: boolean) => {
        props.changeTaskStatus(props.id, taskId, status)
    }, [props.id, props.changeTaskStatus]);

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        props.updateTask(props.id, taskId, title)
    }, [props.id, props.updateTask]);

    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(todo ? todo.id : '', newTitle));
    }, [todo, dispatch]);

    const removeTodoList = () => dispatch(removeTodoListAC(props.id));

    const allTodoListTasks = props.tasks;
    let tasksForTodolist = allTodoListTasks;

    if (props.filter === 'Active') {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
    }

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
                    tasksForTodolist.map((t) => {
                        return (
                            <TaskWithRedux
                                key={t.id}
                                todoListId={props.id}
                                task={t}
                            />
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
})