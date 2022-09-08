import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: tsarType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskID)
            };
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.newTitle, isDone: false};
            return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]};
        case "ADD-NEW-TASKS-ARRAY":
            return {[action.payload.todoListId]: [], ...state};
        case "REMOVE-TASKS-ARRAY":
            delete state[action.payload.todoListId];
            return state;
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el =>
                    el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el)
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId].map(el =>
                    el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)
            };
        default:
            return state;
    }
}

export type tsarType = removeTaskACType | addTaskACType
    | addNewTasksArrayACType | removeTasksArrayACType
    | updateTaskACType | changeTaskStatusACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todoListId, taskID}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {todoListId, newTitle}
    } as const
}

type addNewTasksArrayACType = ReturnType<typeof addNewTasksArrayAC>
export const addNewTasksArrayAC = (todoListId: string) => {
    return {
        type: "ADD-NEW-TASKS-ARRAY",
        payload: {todoListId}
    } as const
}

type removeTasksArrayACType = ReturnType<typeof removeTasksArrayAC>
export const removeTasksArrayAC = (todoListId: string) => {
    return {
        type: "REMOVE-TASKS-ARRAY",
        payload: {todoListId}
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todoListId: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {todoListId, taskID, newTitle}
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {todoListId, taskId, isDone}
    } as const
}