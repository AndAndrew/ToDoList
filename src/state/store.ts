import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todoListsReducer} from "../reducers/todoListReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// window.store = store;