import {addTodoListACType, removeTodoListACType, SetTodoListsACType} from "./todoListReducer";
import {TaskType, tasksAPI, TaskStatuses, UpdateTaskModelType, TaskPriorities} from "../api/todoListAPI";
import {AppRootStateType, AppThunk} from "../state/store";

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

export type TaskActionsType = removeTaskACType | addTaskACType
    | updateTaskACType | changeTaskStatusACType
    | addTodoListACType | removeTodoListACType | SetTodoListsACType
    | SetTasksActionType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todoListId, taskID}
    } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {todoListId, task}
    } as const
}
type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todoListId: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {todoListId, taskID, newTitle}
    } as const
}
type changeTaskStatusACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todoListId: string, taskId: string, task: TaskType) => {
    return {
        type: "CHANGE-TASK",
        payload: {todoListId, taskId, task}
    } as const
}
type SetTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {tasks, todoListId}
    } as const
}

export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    const res = await tasksAPI.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(setTasksAC(tasks, todolistId))
}
export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => async dispatch => {
    await tasksAPI.deleteTask(todoListId, taskId);
    dispatch(removeTaskAC(todoListId, taskId))
}
export const addTaskTC = (todoListId: string, title: string): AppThunk => async dispatch => {
    const res = await tasksAPI.createTask(todoListId, title);
    dispatch(addTaskAC(todoListId, res.data.data.item))
}
export type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadLine?: string
}
export const updateTaskTC = (todoListId: string, taskId: string, value: UpdateTaskType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find((t: TaskType) => t.id === taskId);
    if (task) {
        const model: UpdateTaskModelType = {
            ...task,
            ...value
        }
        const res = await tasksAPI.updateTask(todoListId, taskId, model);
        dispatch(changeTaskAC(todoListId, taskId, res.data.data.item))
    }
}
