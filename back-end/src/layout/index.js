import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { verifyAuth } from "../modules/auth/store/actions";
import ProtectedLayout from "./ProtectedLayout";
import PublicLayout from "./PublicLayout";

function Layout(props) {

    const { isAuthenticated, user, children, dispatch } = props

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(verifyAuth())
        }
    }, [isAuthenticated])

    if (isAuthenticated) {
        return <ProtectedLayout {...props}>{children}</ProtectedLayout>
    }
    return <PublicLayout {...props}>{children}</PublicLayout>
}

const mapStateToProps = state => {
    console.log(state)
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user,
    }
}

export default withRouter(connect(mapStateToProps)(Layout))
