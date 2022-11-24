import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../components/TodoList";
import {AddItemForm} from "../components/AddItemForm";
import ButtonAppBar from "../components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import {
    addTodoListTC,
    changeFilterAC, fetchTodoListsTC, FilterValuesType,
    TodoListDomainType
} from "../reducers/todoListReducer";
import {useAppDispatch, useAppSelector} from "./hooks";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "./appReducer";

function AppWithRedux() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListTC(newTitle));
    }, [dispatch])

    let todoLists = useAppSelector(state => state.todoLists);
    let tasks = useAppSelector(state => state.tasks);
    const isInitialised = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isInitialised) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const changeFilter = (todoListID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filterValue));
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ButtonAppBar/>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={
                            isLoggedIn ? <><Grid container style={{padding: '20px'}}>
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
                                                            entityStatus={el.entityStatus}
                                                            changeFilter={changeFilter}
                                                            filter={el.filter}
                                                        />
                                                    </Paper>
                                                </Grid>
                                            )
                                        })}
                                    </Grid></>
                                : <Navigate to={'/login'}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;
