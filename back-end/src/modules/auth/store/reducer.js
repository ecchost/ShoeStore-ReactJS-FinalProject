import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAILURE
} from "./action-types";

export default (
    state = {
        isLoggingIn : false,
        isLoggingOut:false,
        isVerifying:false,
        loginError:false,
        logoutError:false,
        isAuthenticated:false,
        user:{}
    },
    action
) => {
    switch (action.type){
        case LOGIN_REQUEST:
            return {...state, isLoggingIn: true, loginError: false};
        case LOGIN_SUCCESS:
            return {...state, isLoggingIn: false, isAuthenticated: true, user: action.user};
        case LOGIN_FAILURE:
            return {...state, isLoggingIn: false, isAuthenticated: false, loginError: true};
        case LOGOUT_REQUEST:
            return {...state, isLoggingOut: true, logoutError: false};
        case LOGOUT_SUCCESS:
            return {...state, isLoggingOut: false, isAuthenticated: false, user: {}};
        case LOGOUT_FAILURE:
            return {...state, isLoggingOut: false, logoutError: true};
        case VERIFY_SUCCESS:
            return {...state, isVerifying: false};
        case VERIFY_REQUEST:
            return {...state, isVerifying: true, verifyingError: false};
        default:
            return state;
    }
}