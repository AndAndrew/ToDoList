import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";
import {TaskPriorities, TaskStatuses} from "../api/todoListAPI";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TodoLists/Task',
  component: Task,
  args: {
    // task: {id: 'aaa', isDone: false, title: 'JS'},
    removeTask: action('removeTask'),
    // changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
//
// export const TaskIsDone = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsDone.args = {
//   task: {id: 'aaa', isDone: true, title: 'JS'},
//   removeTask: action('removeTask'),
//   changeTaskStatus: action('changeTaskStatus'),
//   changeTaskTitle: action('changeTaskTitle'),
// };
//
// export const TaskIsntDone = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsntDone.args = {
//   task: {id: 'aaa', isDone: false, title: 'JS'},
//   removeTask: action('removeTask'),
//   changeTaskStatus: action('changeTaskStatus'),
//   changeTaskTitle: action('changeTaskTitle'),
// };

const Template: ComponentStory<typeof Task> = (args) => {
  const [task, setTask] = useState({id: 'aaa', status: TaskStatuses.New, title: 'JS',
    description: '', completed: false, priority: TaskPriorities.Low, startDate: '',
    deadline: '', order: 0, addedDate: '', todoListId: ''})
  const changeTaskStatus = () => setTask({...task, status: TaskStatuses.Completed})
  return <Task {...args} changeTaskStatus={changeTaskStatus} task={task}/>;
};

export const TaskStory = Template.bind({});