import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    removeTaskAC, updateTaskAC, updateTaskTC
} from "./reducers/tasksReducer";
import {
    addTodoListTC,
    changeFilterAC, fetchTodoListsTC, FilterValuesType,
    removeTodoListAC, TodoListDomainType
} from "./reducers/todoListReducer";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {TaskStatuses} from "./api/todoListAPI";

function AppWithRedux() {

    let todoLists = useAppSelector(state => state.todoLists);
    let tasks = useAppSelector(state => state.tasks);

    let dispatch = useAppDispatch();

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    }
    // const addTask = (newTitle: string, todoListId: string) => {
    //     dispatch(addTaskAC(todoListId, newTitle));
    // }
    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListTC(newTitle));
    }, [dispatch])
    const updateTask = useCallback((todoListId: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(todoListId, taskID, newTitle));
    }, [dispatch])
    // const updateTodoList = useCallback((todoListId: string, newTitle: string) => {
    //     dispatch(updateTodoListTitleTC(todoListId, newTitle));
    // }, [dispatch])
    const removeTask = (taskID: string, todoListId: string) => {
        dispatch(removeTaskAC(todoListId, taskID));
    }
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId, taskId, {status}));
    }, [dispatch])
    const changeFilter = (todoListID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filterValue));
    }

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el: TodoListDomainType) => {
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={el.id}
                                        id={el.id}
                                        tasks={tasks[el.id]}
                                        changeFilter={changeFilter}
                                        removeTask={removeTask}
                                        // changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        updateTask={updateTask}
                                        // updateTodoList={updateTodoList}
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
