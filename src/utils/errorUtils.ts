import {setAppError, SetAppErrorType, setAppStatus, SetAppStatusType} from "../app/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/instance";
import axios, {AxiosError} from "axios";

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('some error'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, e: unknown) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as ({ error: string })).error
            : err.message
        dispatch(setAppError(error))
    }
    dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = SetAppErrorType | SetAppStatusType