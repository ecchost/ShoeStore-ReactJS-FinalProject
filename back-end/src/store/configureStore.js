import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers'
import thunkMiddleware from "redux-thunk";
import {verifyAuth} from "../modules/auth/store/actions";

export default function configureStore(persistedState){
    const store = createStore(
        rootReducer,
        persistedState,
        applyMiddleware(thunkMiddleware)
    )
    store.dispatch(verifyAuth);
    return store;
}