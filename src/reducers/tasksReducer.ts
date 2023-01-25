import {
    addTodoListAC, changeTodoListEntityStatusAC,
    removeTodoListAC,
    setTodoListsAC,
} from "./todoListReducer";
import {
    TaskType,
    tasksAPI,
    TaskStatuses,
    UpdateTaskModelType,
    TaskPriorities
} from "../api/tasksAPI";
import {AppRootStateType, AppThunk} from "../state/store";
import {SetAppErrorType, setAppStatus, SetAppStatusType} from "../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {ResultCode} from "../api/instance";

let initialState: TasksStateType = {}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskID)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todoListId]: [action.payload.task, ...state[action.payload.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el =>
                    el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el)
            };
        case "CHANGE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map((el) =>
                    el.id === action.payload.task.id ? {...el, ...action.payload.task} : el)
            };
        case "ADD-TODO-LIST":
            return {[action.payload.todoList.id]: [], ...state};
        case "REMOVE-TODO-LIST":
            const copyState = {...state};
            delete copyState[action.payload.todoListId];
            return copyState;
        case "SET-TODO-LISTS":
            const stateCopy = {...state}
            action.payload.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            });
            return stateCopy;
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todoListId] = action.payload.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

export type TaskActionsType =
    | ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC> | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof addTodoListAC> | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC> | ReturnType<typeof setTasksAC>
    | SetAppStatusType | SetAppErrorType

export const removeTaskAC = (todoListId: string, taskID: string) => ({
    type: "REMOVE-TASK",
    payload: {todoListId, taskID}
}) as const
export const addTaskAC = (todoListId: string, task: TaskType) => ({
    type: "ADD-TASK",
    payload: {todoListId, task}
}) as const
export const updateTaskAC = (todoListId: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {todoListId, taskID, newTitle}
    } as const
}
export const changeTaskAC = (todoListId: string, taskId: string, task: TaskType) => {
    return {
        type: "CHANGE-TASK",
        payload: {todoListId, taskId, task}
    } as const
}
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {tasks, todoListId}
    } as const
}

export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await tasksAPI.getTasks(todolistId);
        const tasks = res.data.items;
        dispatch(setTasksAC(tasks, todolistId));
    } catch (error) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setAppStatus('idle'));
    }
}
export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'));
        await tasksAPI.deleteTask(todoListId, taskId);
        dispatch(removeTaskAC(todoListId, taskId));
    } catch (error) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setAppStatus('idle'));
    }
}
export const addTaskTC = (todoListId: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
        const res = await tasksAPI.createTask(todoListId, title);
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(addTaskAC(todoListId, res.data.data.item));
        } else {
            handleServerAppError<{ item: TaskType }>(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setAppStatus('idle'))
        dispatch(changeTodoListEntityStatusAC(todoListId, 'idle'))
    }
}

type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadLine?: string,
}
export const updateTaskTC = (todoListId: string, taskId: string, value: UpdateTaskType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
        const task = getState().tasks[todoListId].find((t: TaskType) => t.id === taskId);
        if (task) {
            const model: UpdateTaskModelType = {
                ...task,
                ...value
            }
            const res = await tasksAPI.updateTask(todoListId, taskId, model);
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(changeTaskAC(todoListId, taskId, res.data.data.item))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setAppStatus('idle'))
        dispatch(changeTodoListEntityStatusAC(todoListId, 'idle'))
    }
}
