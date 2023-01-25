import {AxiosResponse} from "axios";
import {instance, ResponseType} from "./instance";

export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}

export type UpdateTodoListModelType = {
    title: string,
}

export const todoListAPI = {
    getTodoList() {
        return instance.get<TodoListType[]>('todo-lists');
    },
    createTodoList(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListType }>>>('todo-lists', {title: title});
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
    },
    updateTodoList(todoListId: string, model: UpdateTodoListModelType) {
        return instance.put<UpdateTodoListModelType>(
            `todo-lists/${todoListId}`, model
        );
    }
}