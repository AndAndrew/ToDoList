import {AppThunk} from "../../state/store";
import {setAppStatus} from "../../app/appReducer";
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
}

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value}) as const

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error)
    }
    dispatch(setAppStatus('succeeded'));
}
export const logoutTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch
        (error) {
        handleServerNetworkError(dispatch, error)
    }
}