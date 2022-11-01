import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TaskActionsType, tasksReducer} from "../reducers/tasksReducer";
import {TodoListActionsType, todoListsReducer} from "../reducers/todoListReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodoListActionsType | TaskActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// window.store = store;