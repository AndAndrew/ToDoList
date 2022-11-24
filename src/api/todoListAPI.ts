import axios, {AxiosResponse} from "axios";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum ResultCode {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10
}

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
type GetTasksResponseType = {
    items: TaskType[],
    totalCount: number,
    error: null
}
export type UpdateTaskModelType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string
}
export type UpdateTodoListModelType = {
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '8f1da31f-2ec3-4f0d-8757-bcc4266dd215',
    },
})

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
        return promise
    },
    me() {
        const promise = instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me');
        return promise
    }
}
export const todoListAPI = {
    getTodoList() {
        const promise = instance.get<TodoListType[]>('todo-lists');
        return promise;
    },
    createTodoList(title: string) {
        const promise = instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListType }>>>('todo-lists', {title: title});
        return promise;
    },
    deleteTodoList(todoListId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todoListId}`);
        return promise;
    },
    updateTodoList(todoListId: string, model: UpdateTodoListModelType) {
        return instance.put<UpdateTodoListModelType>(
            `todo-lists/${todoListId}`, model
        );
    }
}
export const tasksAPI = {
    getTasks(todoListId: string) {
        const promise = instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`);
        return promise;
    },
    createTask(todoListId: string, title: string) {
        const promise = instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoListId}/tasks`, {title: title});
        return promise;
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
        return promise;
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
            `todo-lists/${todoListId}/tasks/${taskId}`, model
        );
    }
}