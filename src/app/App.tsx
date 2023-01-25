import React, {useEffect} from 'react';
import ButtonAppBar from "../components/ButtonAppBar";
import Container from "@mui/material/Container";
import {useAppDispatch, useAppSelector} from "./hooks";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "./appReducer";
import {TodoListsList} from "../components/TodoListsList";
import styles from "./App.module.css"

export const App = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const isInitialised = useAppSelector(state => state.app.isInitialized)

    if (!isInitialised) {
        return <div className={styles.loadingCircle}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className={styles.App}>
                <ButtonAppBar/>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoListsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}
