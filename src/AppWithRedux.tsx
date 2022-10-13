import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC, changeTaskStatusAC,
    removeTaskAC,
    tasksReducer, updateTaskAC
} from "./reducers/tasksReducer";
import {
    addTodoListAC,
    changeFilterAC,
    removeTodoListAC,
    todoListsReducer,
    updateTodoListAC
} from "./reducers/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    let dispatch = useDispatch();

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    }

    const addTask = (newTitle: string, todoListId: string) => {
        dispatch(addTaskAC(todoListId, newTitle));
    }

    const addTodoList = useCallback((newTitle: string) => {
        const action = addTodoListAC(newTitle);
        dispatch(action);
    }, [dispatch])

    const updateTask = useCallback((todoListId: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(todoListId, taskID, newTitle));
    }, [dispatch])

    const updateTodoList = useCallback((todoListId: string, newTitle: string) => {
        dispatch(updateTodoListAC(todoListId, newTitle));
    }, [dispatch])

    const removeTask = (taskID: string, todoListId: string) => {
        dispatch(removeTaskAC(todoListId, taskID));
    }

    const changeTaskStatus = useCallback((todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone));
    }, [dispatch])

    const changeFilter = (todoListID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filterValue));
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el: TodoListType) => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={el.id}
                                        id={el.id}
                                        tasks={tasks[el.id]}
                                        changeFilter={changeFilter}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        updateTask={updateTask}
                                        updateTodoList={updateTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
