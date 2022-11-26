import React, {memo, useCallback, useEffect} from "react";
import {UniversalButton} from "./UniversalButton";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {addTaskTC, fetchTasksTC} from "../reducers/tasksReducer";
import {FilterValuesType, removeTodoListTC, updateTodoListTitleTC} from "../reducers/todoListReducer";
import {TaskWithRedux} from "./TaskWithRedux";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {TaskStatuses, TaskType} from "../api/todoListAPI";
import {RequestStatusType} from "../app/appReducer";

type PropsType = {
    id: string,
    tasks: Array<TaskType>,
    entityStatus: RequestStatusType,
    changeFilter: (todoListID: string, filterValue: FilterValuesType) => void,
    filter: FilterValuesType
}

export const TodoList = memo((props: PropsType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [props.id, dispatch])
    const todo = useAppSelector(state => state.todoLists.find(todo => {
        return todo && todo.id === props.id
    }));

    const filterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.id, filterValue);
    }

    const updateTodoListHandler = useCallback((newTitle: string) => {
        dispatch(updateTodoListTitleTC(props.id, newTitle));
    }, [dispatch, props.id]);
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskTC(todo ? todo.id : '', newTitle));
    }, [todo, dispatch]);
    const removeTodoList = useCallback(() => dispatch(removeTodoListTC(props.id)), [dispatch, props.id]);

    const allTodoListTasks = props.tasks;
    let tasksForTodolist = allTodoListTasks;

    if (props.filter === 'Active') {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={todo ? todo.title : ''}
                              callBack={(newTitle) => updateTodoListHandler(newTitle)}
                              disabled={props.entityStatus === 'loading'}/>
                <IconButton aria-label="delete"
                            onClick={removeTodoList}
                            disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm label={'Add new task'} callBack={addTaskHandler} disabled={props.entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map((t) => {
                        return (
                            <TaskWithRedux
                                key={t.id}
                                todoListId={props.id}
                                task={t}
                                entityStatus={props.entityStatus}
                            />
                        )
                    })}
            </ul>
            <div>
                <UniversalButton variant={props.filter === 'All' ? 'outlined' : 'text'}
                                 callBack={() => {
                                     filterHandler('All')
                                 }}
                                 color={'coral'}
                                 nickName={'all'}/>
                <UniversalButton variant={props.filter === 'Active' ? 'outlined' : 'text'}
                                 callBack={() => {
                                     filterHandler('Active')
                                 }}
                                 color={'coral'}
                                 nickName={'active'}/>
                <UniversalButton variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                                 callBack={() => {
                                     filterHandler('Completed')
                                 }}
                                 color={'coral'}
                                 nickName={'completed'}/>
            </div>
        </div>
    );
})