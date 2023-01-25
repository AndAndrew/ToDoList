import {
    TodoListType,
    todoListAPI,
    UpdateTodoListModelType
} from "../api/todoListAPI";
import {AppRootStateType, AppThunk} from "../state/store";
import {RequestStatusType, setAppError, SetAppErrorType, setAppStatus, SetAppStatusType} from "../app/appReducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {ResultCode} from "../api/instance";

let initialState: Array<TodoListDomainType> = [];

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
}

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODO-LIST":
            return [{...action.payload.todoList, filter: 'All', entityStatus: 'idle'}, ...state];
        case "REMOVE-TODO-LIST":
            return state.filter(el => el.id !== action.payload.todoListId);
        case "UPDATE-TODO-LIST":
            return state.map((el) => el.id === action.payload.todoList.id ? {...action.payload.todoList} : el);
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todoListID
                ? {...el, filter: action.payload.filterValue} : el);
        case "SET-TODO-LISTS":
            return action.payload.todoLists.map(todoList => ({
                ...todoList,
                filter: 'All',
                entityStatus: 'idle'
            }));
        case "CHANGE-TODO-LISTS-ENTITY-STATUS":
            return state.map((el) =>
                el.id === action.payload.id ? {...el, entityStatus: action.payload.status} : el)
        default:
            return state
    }
}

export type TodoListActionsType =
    | ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof updateTodoListAC> | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodoListsAC> | SetAppStatusType | SetAppErrorType
    | ReturnType<typeof changeTodoListEntityStatusAC>

export const addTodoListAC = (todoList: TodoListType) => {
    return {
        type: "ADD-TODO-LIST",
        payload: {todoList}
    } as const
}
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODO-LIST",
        payload: {todoListId}
    } as const
}
export const updateTodoListAC = (todoListId: string, todoList: TodoListDomainType) => {
    return {
        type: "UPDATE-TODO-LIST",
        payload: {todoListId, todoList}
    } as const
}
export const changeFilterAC = (todoListID: string, filterValue: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {todoListID, filterValue}
    } as const
}
export const setTodoListsAC = (todoLists: Array<TodoListType>) => {
    return {
        type: 'SET-TODO-LISTS',
        payload: {todoLists}
    } as const
}
export const changeTodoListEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TODO-LISTS-ENTITY-STATUS',
        payload: {id, status}
    } as const
}

export const fetchTodoListsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todoListAPI.getTodoList()
        dispatch(setTodoListsAC(res.data))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}
export const removeTodoListTC = (todoListId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
        await todoListAPI.deleteTodoList(todoListId)
        dispatch(removeTodoListAC(todoListId))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(changeTodoListEntityStatusAC(todoListId, 'idle'))
            dispatch(setAppError(error))
        }
        dispatch(setAppStatus('failed'))
    }

}
export const addTodoListTC = (title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const res = await todoListAPI.createTodoList(title);
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(addTodoListAC(res.data.data.item))
        } else {
            handleServerAppError<{ item: TodoListType }>(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const updateTodoListTitleTC = (todoListId: string, title: string): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus('loading'))
    const todoList = getState().todoLists.find((t: TodoListType) => t.id === todoListId);
    if (todoList) {
        const model: UpdateTodoListModelType = {
            ...todoList,
            title: title,
        }
        await todoListAPI.updateTodoList(todoListId, model);
        const updatedTodoList = {
            ...todoList,
            title: title
        }
        dispatch(updateTodoListAC(todoListId, updatedTodoList))
        dispatch(setAppStatus('succeeded'))
    }
}