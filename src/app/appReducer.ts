import {AppThunk} from "../state/store";
import {authAPI} from "../api/authAPI";
import {setIsLoggedInAC} from "../features/Login/authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.value}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (value: null | string) => ({type: 'APP/SET-ERROR', value} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC = (): AppThunk => async dispatch => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
    } else {

    }
    dispatch(setAppInitialized(true))
    dispatch(setAppStatus('idle'))
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>
export type ActionsType = SetAppStatusType | SetAppErrorType | ReturnType<typeof setAppInitialized>