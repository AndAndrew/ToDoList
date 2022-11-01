import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import thunk from "redux-thunk";
import {tasksReducer} from "../reducers/tasksReducer";
import {todoListsReducer} from "../reducers/todoListReducer";
import {Provider} from "react-redux";
import React from "react";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', completed: true},
            {id: v1(), title: 'JS', completed: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', completed: true},
            {id: v1(), title: 'React Book', completed: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>);
