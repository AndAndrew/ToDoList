import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]);

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true};
        setTasks([newTask, ...tasks]);

    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((el) => el.id !== taskID))
    }

    const [filter, setFilter] = useState<FilterValuesType>('All')

    let tasksForToDoList = tasks
    if (filter === 'Active') {
        tasksForToDoList = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        tasksForToDoList = tasks.filter(el => el.isDone)
    }

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
