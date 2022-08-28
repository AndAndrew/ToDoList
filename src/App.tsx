import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React book", isDone: true}
        ]
    });

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el => el.id !==todoListId))
        delete tasks[todoListId]
    }

    const addTask = (newTitle: string, todoListId: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        const todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks];
        setTasks({...tasks});
        // setTasks({...tasks, [todoListId]:[newTask, ...tasks[todoListId]]})
    }

    const addTodoList = (newTitle: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: newTitle, filter: 'All'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoListId]: [], ...tasks})
    }

    const updateTask = (todoListId: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id===taskID ? {...el, title: newTitle} : el)})
    }

    const updateTodoList = (todoListId: string, newTitle: string) => {
        setTodoLists(todoLists.map(el=>el.id === todoListId ? {...el, title: newTitle} : el))
    }

    const removeTask = (taskID: string, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(el => el.id != taskID)
        setTasks({...tasks})
        // setTasks({...tasks, [todoListId]:tasks[todoListId].filter(el=>el.id!==taskID)})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks});
        }
        // setTasks({...tasks, [todoListId]:tasks[todoListId].map(el=> el.id===taskId ? {...el, isDone:isDone} : el)})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            {todoLists.map((el: TodoListType) => {

                const allTodoListTasks = tasks[el.id]
                let tasksForTodolist = allTodoListTasks;

                if (el.filter === "Active") {
                    tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
                }
                if (el.filter === "Completed") {
                    tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
                }
                return (
                    <TodoList
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                        updateTask={updateTask}
                        updateTodoList={updateTodoList}
                    />
                )
            })}
            {/*<TodoList*/}
            {/*    title="What to learn"*/}
            {/*    tasks={tasksForToDoList}*/}
            {/*    removeTask={removeTask}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*    addTask={addTask}*/}
            {/*    changeStatus={changeTaskStatus}*/}
            {/*    filter={filter}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
