import React from "react";
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Routes from './routes'
import "./index.scss"
import { verifyAuth } from "./modules/auth/store/actions"
import store from "./store"

store.dispatch(verifyAuth())

render((<Provider store={store}>
        <Routes/>
    </Provider>),
    document.getElementById('root'),
)
