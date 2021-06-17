import React, {Suspense} from "react";
import {Route, Redirect} from "react-router-dom"
import {connect} from 'react-redux'

const protectedRoutes = ({component: Component, isAuthenticated, isVerifying, ...rest}) => {
    return <Route
        {...rest}
        render={props => {
            return <Suspense fallback={<div>Loading...</div>}>
                {isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }} />
                }
            </Suspense>
        }}
    />
};

function mapStateToProps(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(protectedRoutes);