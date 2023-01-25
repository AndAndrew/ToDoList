import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/tasksAPI";
import {TaskWithRedux} from "../components/TaskWithRedux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TodoLists/Task',
    component: TaskWithRedux,
    args: {
        // task: {id: 'aaa', isDone: false, title: 'JS'},
        removeTask: action('removeTask'),
        // changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TaskWithRedux>;

const Template: ComponentStory<typeof TaskWithRedux> = (args) => {
    const [task, setTask] = useState({
        id: 'aaa', status: TaskStatuses.New, title: 'JS',
        description: '', completed: false, priority: TaskPriorities.Low, startDate: '',
        deadline: '', order: 0, addedDate: '', todoListId: ''
    })
    const changeTaskStatus = () => setTask({...task, status: TaskStatuses.Completed})
    return <TaskWithRedux {...args} task={task}/>;
};

export const TaskStory = Template.bind({});