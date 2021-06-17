import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'

const publicRoutes = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </Suspense>
    }}/>
}

export default publicRoutes
