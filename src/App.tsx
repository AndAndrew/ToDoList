import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]);

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter((el) => el.id !== taskID))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
