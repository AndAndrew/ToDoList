import {FilterValuesType, TodoListType} from "../App";
import {addTodoListAC, changeFilterAC, removeTodoListAC, todoListsReducer, updateTodoListAC} from "./todoListReducer";
import {v1} from "uuid";

let todoListId1: string;
let todoListId2: string;

let startState: Array<TodoListType> = [];

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ];
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});
test('correct todolist should be added', () => {

    let newToDoListTitle = 'New Todo List';

    const endState = todoListsReducer(startState, addTodoListAC(newToDoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newToDoListTitle);
});
test('correct todolist should change its name', () => {

    let newToDoListTitle = 'New Todo List';

    const action = updateTodoListAC(todoListId2, newToDoListTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newToDoListTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'Completed';

    const action = changeFilterAC(todoListId2, newFilter);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});