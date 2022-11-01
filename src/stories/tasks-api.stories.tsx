import React, {useEffect, useState} from 'react'
import {tasksAPI, TaskStatuses, UpdateTaskModelType} from "../api/todoListAPI";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks('907328af-ce0e-4d40-867c-779eef00de4c')
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const SetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask('907328af-ce0e-4d40-867c-779eef00de4c', 'Do do')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'd2c1aeaa-d2be-472e-9dd9-85bfb3aefc89'
        const taskId = '17a3e7b8-945f-4336-b401-1e7292dcdc41'
        tasksAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const todoListId = 'd2c1aeaa-d2be-472e-9dd9-85bfb3aefc89'
    const taskId = '17a3e7b8-945f-4336-b401-1e7292dcdc41'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const model: UpdateTaskModelType = {
            title: 'new task',
            startDate: '',
            priority: 0,
            description: '',
            deadline: '',
            status: TaskStatuses.New
        }
        tasksAPI.updateTask(todoListId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}