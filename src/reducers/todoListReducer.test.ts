import {FilterValuesType, TodoListType} from "../App";
import {addTodoListAC, changeFilterAC, removeTodoListAC, todoListsReducer, updateTodoListAC} from "./todoListReducer";
import {v1} from "uuid";


test('correct todolist should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ];

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});
test('correct todolist should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newToDoListId = v1();
    let newToDoListTitle = 'New Todo List';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ];

    const endState = todoListsReducer(startState, addTodoListAC(newToDoListId, newToDoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newToDoListTitle);
});
test('correct todolist should change its name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newToDoListTitle = 'New Todo List';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ];

    const action = updateTodoListAC(todoListId2, newToDoListTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newToDoListTitle);
});
test('correct filter of todolist should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValuesType = 'Completed';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ];

    const action = changeFilterAC(todoListId2, newFilter);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});