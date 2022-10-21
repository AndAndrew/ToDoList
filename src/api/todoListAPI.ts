import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
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

export const todoListAPI = {
    getTodoList() {
        const promise = instance.get<TodolistType[]>('todo-lists');
        return promise;
    },

    createTodoList(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title});
        return promise;
    },

    deleteTodoList(todoListId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todoListId}`);
        return promise;
    },

    updateTodoList(todoListId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todoListId}`,
            {title: 'React'}
        );
        return promise;
    },
}