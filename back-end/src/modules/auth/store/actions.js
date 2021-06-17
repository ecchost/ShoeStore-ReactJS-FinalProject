import {myFirebase} from "../../../utils/configureFireStore";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST
} from "./action-types"

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
}
const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS, user
    };
}
const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
}
const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
}
const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
}
const requestlogout = () => {
    return{
        type: LOGOUT_REQUEST
    }
}
const receiveLogout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}
const logoutError = () => {
    return{
        type: LOGOUT_FAILURE
    }
}

export const login = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => {
            dispatch(receiveLogin(user))
        })
        .catch(error => {
            console.log("error");
            dispatch(loginError())
        })
}
export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if(user !== null){
            dispatch(receiveLogin(user));
        }
        dispatch(verifySuccess())
    })
}
export const logout = () => dispatch => {
    dispatch(requestlogout());
    myFirebase.auth().signOut().then(() =>dispatch(receiveLogout()))
        .catch(error => {
            dispatch(logoutError());
        })
}