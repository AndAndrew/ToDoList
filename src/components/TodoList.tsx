import React, {memo, useCallback, useEffect} from "react";
import {UniversalButton} from "./UniversalButton";
import s from '../TodoList.module.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {addTaskTC, fetchTasksTC} from "../reducers/tasksReducer";
import {FilterValuesType, removeTodoListTC, updateTodoListTitleTC} from "../reducers/todoListReducer";
import {TaskWithRedux} from "./TaskWithRedux";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {TaskStatuses, TaskType} from "../api/todoListAPI";

type PropsType = {
    id: string,
    tasks: Array<TaskType>,
    changeFilter: (todoListID: string, filterValue: FilterValuesType) => void
    filter: FilterValuesType
}

export const TodoList = memo((props: PropsType) => {

    const todo = useAppSelector(state => state.todoLists.find(todo => {
        return todo && todo.id === props.id
    }));

    const dispatch = useAppDispatch();

    const filterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.id, filterValue);
    }
    const updateTodoListHandler = (newTitle: string) => {
        dispatch(updateTodoListTitleTC(props.id, newTitle));
    };
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskTC(todo ? todo.id : '', newTitle));
    }, [todo, dispatch]);
    const removeTodoList = () => dispatch(removeTodoListTC(props.id));

    const allTodoListTasks = props.tasks;
    let tasksForTodolist = allTodoListTasks;

    if (props.filter === 'Active') {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [props.id, dispatch])

    return (
        <div>
            <h3>
                <EditableSpan title={todo ? todo.title : ''}
                              callBack={(newTitle) => updateTodoListHandler(newTitle)}/>
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