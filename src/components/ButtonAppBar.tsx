import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {RequestStatusType} from "../app/appReducer";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {useCallback} from "react";
import {logoutTC} from "../features/Login/authReducer";

export default function ButtonAppBar() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <ErrorSnackbar/>
            <AppBar position="static" style={{backgroundColor: 'orange'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color='secondary'/>}
            </AppBar>
        </Box>
    );
}
