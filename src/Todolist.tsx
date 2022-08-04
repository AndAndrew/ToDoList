import React, {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}

export const Todolist = (props: PropsType) => {
    const [filter, setFilter] = useState('All')

    let filteredTasks = props.tasks
    if (filter === 'Active') {
        filteredTasks = props.tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = props.tasks.filter(el => el.isDone)
    }

    const filterTask = (filterValue: string) => {
        setFilter(filterValue)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    filteredTasks.map((el, index) => {
                        return (
                            <li key={index}>
                                <button onClick={() => {
                                    props.removeTask(el.id)
                                }}>X
                                </button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })}
            </ul>
            <div>
                <button onClick={() => {
                    filterTask('All')
                }}>All
                </button>
                <button onClick={() => {
                    filterTask('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    filterTask('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}