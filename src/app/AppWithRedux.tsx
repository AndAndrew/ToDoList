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
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

function AppWithRedux() {

    let todoLists = useAppSelector(state => state.todoLists);
    let tasks = useAppSelector(state => state.tasks);

    let dispatch = useAppDispatch();

    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListTC(newTitle));
    }, [dispatch])
    const changeFilter = (todoListID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filterValue));
    }

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className="App">
                <ButtonAppBar/>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<><Grid container style={{padding: '20px'}}>
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
                        }/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;
