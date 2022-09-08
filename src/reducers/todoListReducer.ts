import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export const todoListsReducer = (state: Array<TodoListType>, action: tsarType) => {
    switch (action.type) {
        case "ADD-TODO-LIST":
            const newTodoList: TodoListType = {
                id: action.payload.newTodoListId,
                title: action.payload.newTitle,
                filter: 'All'
            };
            return [newTodoList, ...state];
        case "REMOVE-TODO-LIST":
            return state.filter(el => el.id !== action.payload.todoListId);
        case "UPDATE-TODO-LIST":
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el);
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todoListID ? {
                ...el,
                filter: action.payload.filterValue
            } : el);
        default:
            return state
    }
}

export type tsarType = addTodoListACType | removeTodoListACType
    | updateTodoListACType | changeFilterACType

type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodoListId: string, newTitle: string) => {
    return {
        type: "ADD-TODO-LIST",
        payload: {newTodoListId, newTitle}
    } as const
}

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODO-LIST",
        payload: {todoListId}
    } as const
}

type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export const updateTodoListAC = (todoListId: string, newTitle: string) => {
    return {
        type: "UPDATE-TODO-LIST",
        payload: {todoListId, newTitle}
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListID: string, filterValue: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {todoListID, filterValue}
    } as const
}