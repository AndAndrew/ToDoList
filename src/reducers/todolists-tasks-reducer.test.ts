import {TasksStateType, TodoListType} from "../unusingElements/App";
import {addTodoListAC, todoListsReducer} from "./todoListReducer";
import {tasksReducer} from "./tasksReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newTodoListId);
    expect(idFromTodolists).toBe(action.payload.newTodoListId);
});
