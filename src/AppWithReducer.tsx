import React, {useReducer} from 'react';
// import './App.css';
// import {TaskType, TodoList} from "./TodoList";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import ButtonAppBar from "./components/ButtonAppBar";
// import {Container, Grid, Paper} from "@mui/material";
// import {
//     addTaskAC, changeTaskStatusAC,
//     removeTaskAC,
//     tasksReducer, updateTaskAC
// } from "./reducers/tasksReducer";
// import {
//     addTodoListAC,
//     changeFilterAC,
//     removeTodoListAC,
//     todoListsReducer,
//     updateTodoListAC
// } from "./reducers/todoListReducer";
//
// export type FilterValuesType = 'All' | 'Active' | 'Completed'
//
// export type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function AppWithReducer() {
//
//     let todoListId1 = v1()
//     let todoListId2 = v1()
//
//     let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
//         {id: todoListId1, title: 'What to learn', filter: 'All'},
//         {id: todoListId2, title: 'What to buy', filter: 'All'}
//     ]);
//
//     let [tasks, dispatchTasks] = useReducer(tasksReducer, {
//         [todoListId1]: [
//             {id: v1(), title: "CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Redux", isDone: false}
//         ],
//         [todoListId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React book", isDone: true}
//         ]
//     });
//
//     const removeTodoList = (todoListId: string) => {
//         dispatchTodoLists(removeTodoListAC(todoListId));
//         dispatchTasks(removeTodoListAC(todoListId))
//     }
//
//     const addTask = (newTitle: string, todoListId: string) => {
//         dispatchTasks(addTaskAC(todoListId, newTitle));
//     }
//
//     const addTodoList = (newTitle: string) => {
//         const action = addTodoListAC(newTitle);
//         dispatchTodoLists(action);
//         dispatchTasks(action);
//     }
//
//     const updateTask = (todoListId: string, taskID: string, newTitle: string) => {
//         dispatchTasks(updateTaskAC(todoListId, taskID, newTitle));
//     }
//
//     const updateTodoList = (todoListId: string, newTitle: string) => {
//         dispatchTodoLists(updateTodoListAC(todoListId, newTitle));
//     }
//
//     const removeTask = (taskID: string, todoListId: string) => {
//         dispatchTasks(removeTaskAC(todoListId, taskID));
//     }
//
//     const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
//         dispatchTasks(changeTaskStatusAC(todoListId, taskId, isDone));
//     }
//
//     function changeFilter(todoListID: string, filterValue: FilterValuesType) {
//         // setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
//         dispatchTodoLists(changeFilterAC(todoListID, filterValue));
//     }
//
//     return (
//         <div className="App">
//             <ButtonAppBar/>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm callBack={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todoLists.map((el: TodoListType) => {
//
//                         const allTodoListTasks = tasks[el.id]
//                         let tasksForTodolist = allTodoListTasks;
//
//                         if (el.filter === "Active") {
//                             tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
//                         }
//                         if (el.filter === "Completed") {
//                             tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
//                         }
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding: '10px'}}>
//                                     <TodoList
//                                         key={el.id}
//                                         id={el.id}
//                                         // title={el.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         // removeTodoList={removeTodoList}
//                                         changeFilter={changeFilter}
//                                         // addTask={addTask}
//                                         changeTaskStatus={changeTaskStatus}
//                                         filter={el.filter}
//                                         updateTask={updateTask}
//                                         updateTodoList={updateTodoList}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducer;
