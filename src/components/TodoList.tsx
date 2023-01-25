import React, {memo, useCallback, useEffect} from "react";
import {UniversalButton} from "./button/UniversalButton";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {addTaskTC, fetchTasksTC} from "../reducers/tasksReducer";
import {
    FilterValuesType,
    removeTodoListTC,
    TodoListDomainType,
    updateTodoListTitleTC
} from "../reducers/todoListReducer";
import {Task} from "./Task";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {RequestStatusType} from "../app/appReducer";
import {TaskStatuses, TaskType} from "../api/tasksAPI";

type PropsType = {
    id: string,
    tasks: Array<TaskType>,
    entityStatus: RequestStatusType,
    changeFilter: (todoListID: string, filterValue: FilterValuesType) => void,
    filter: FilterValuesType,
}

export const TodoList = memo(({id, tasks, entityStatus, changeFilter, filter}: PropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [id, dispatch])

    const todo = useAppSelector<TodoListDomainType | undefined>(state => state.todoLists.find(todo => {
        return todo && todo.id === id
    }));

    const filterHandler = (filterValue: FilterValuesType) => {
        changeFilter(id, filterValue);
    }

    const updateTodoListHandler = useCallback((newTitle: string) => {
        dispatch(updateTodoListTitleTC(id, newTitle));
    }, [dispatch, id]);
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskTC(todo ? todo.id : '', newTitle));
    }, [todo, dispatch]);
    const removeTodoList = useCallback(() => dispatch(removeTodoListTC(id)), [dispatch, id]);

    const allTodoListTasks = tasks;
    let tasksForTodolist = allTodoListTasks;

    if (filter === 'Active') {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'Completed') {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={todo ? todo.title : ''}
                              callBack={(newTitle) => updateTodoListHandler(newTitle)}
                              disabled={entityStatus === 'loading'}/>
                <IconButton aria-label="delete"
                            onClick={removeTodoList}
                            disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm label={'Add new task'} callBack={addTaskHandler} disabled={entityStatus === 'loading'}/>
            <ul>
                {
                    tasksForTodolist.map((t) => {
                        return (
                            <Task
                                key={t.id}
                                todoListId={id}
                                task={t}
                                entityStatus={entityStatus}
                            />
                        )
                    })}
            </ul>
            <div>
                <UniversalButton variant={filter === 'All' ? 'outlined' : 'text'}
                                 callBack={() => {
                                     filterHandler('All')
                                 }}
                                 color={'coral'}
                                 nickName={'all'}/>
                <UniversalButton variant={filter === 'Active' ? 'outlined' : 'text'}
                                 callBack={() => {
                                     filterHandler('Active')
                                 }}
                                 color={'coral'}
                                 nickName={'active'}/>
                <UniversalButton variant={filter === 'Completed' ? 'outlined' : 'text'}
                                 callBack={() => {
                                     filterHandler('Completed')
                                 }}
                                 color={'coral'}
                                 nickName={'completed'}/>
            </div>
        </div>
    );
})