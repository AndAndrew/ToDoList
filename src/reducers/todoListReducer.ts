import {
    TodoListType,
    todoListAPI,
    UpdateTodoListModelType
} from "../api/todoListAPI";
import {AppRootStateType, AppThunk} from "../state/store";

let initialState: Array<TodoListDomainType> = [];

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODO-LIST":
            return [{...action.payload.todoList, filter: <FilterValuesType>'All'}, ...state];
        case "REMOVE-TODO-LIST":
            return state.filter(el => el.id !== action.payload.todoListId);
        case "UPDATE-TODO-LIST":
            return state.map((el) => el.id === action.payload.todoList.id ? {...action.payload.todoList} : el);
        case "CHANGE-FILTER":
            // console.log((state.map(el => el.id === action.payload.todoListID ? {...el, filter: action.payload.filterValue} : el))[0].)
            return state.map(el => el.id === action.payload.todoListID
                ? {...el, filter: action.payload.filterValue} : el);
        case "SET-TODO-LISTS":
            return action.payload.todoLists.map(todoList => ({
                ...todoList,
                filter: 'All'
            }));
        default:
            return state
    }
}

export type TodoListActionsType = addTodoListACType | removeTodoListACType
    | updateTodoListACType | changeFilterACType | SetTodoListsACType

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todoList: TodoListType) => {
    return {
        type: "ADD-TODO-LIST",
        payload: {todoList}
    } as const
}
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODO-LIST",
        payload: {todoListId}
    } as const
}
type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export const updateTodoListAC = (todoListId: string, todoList: TodoListDomainType) => {
    return {
        type: "UPDATE-TODO-LIST",
        payload: {todoListId, todoList}
    } as const
}
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoListID: string, filterValue: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {todoListID, filterValue}
    } as const
}
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todoLists: Array<TodoListType>) => {
    return {
        type: 'SET-TODO-LISTS',
        payload: {todoLists}
    } as const
}

export const fetchTodoListsTC = (): AppThunk => async dispatch => {
    const res = await todoListAPI.getTodoList()
    dispatch(setTodoListsAC(res.data))
}
export const removeTodoListTC = (todoListId: string): AppThunk => async dispatch => {
    await todoListAPI.deleteTodoList(todoListId);
    dispatch(removeTodoListAC(todoListId))
}
export const addTodoListTC = (title: string): AppThunk => async dispatch => {
    const res = await todoListAPI.createTodoList(title);
    dispatch(addTodoListAC(res.data.data.item))
}
export const updateTodoListTitleTC = (todoListId: string, title: string): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
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
    }
}