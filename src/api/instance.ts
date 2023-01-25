import axios from "axios";

export type ResponseType<T = {}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: T,
}

export enum ResultCode {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10,
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8f1da31f-2ec3-4f0d-8757-bcc4266dd215',
    },
})