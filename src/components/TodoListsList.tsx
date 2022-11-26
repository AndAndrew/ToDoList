import Grid from "@mui/material/Grid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodoListTC,
    changeFilterAC,
    fetchTodoListsTC,
    FilterValuesType,
    TodoListDomainType
} from "../reducers/todoListReducer";
import Paper from "@mui/material/Paper";
import {TodoList} from "./TodoList";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Navigate} from "react-router-dom";

export const TodoListsList = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])
    const todoLists = useAppSelector(state => state.todoLists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const addTodoList = useCallback((newTitle: string) => {
        dispatch(addTodoListTC(newTitle))
    }, [dispatch])
    const changeFilter = useCallback((todoListID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filterValue))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return <div>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm label={'Add new list'} callBack={addTodoList}/>
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
        </Grid>
    </div>
}