import React, {Component, Fragment} from 'react';
import Breadcrumb from './common/breadcrumb';
import {connect} from "react-redux";


export class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <Breadcrumb title="Dashboard" parent="Dashboard"/>

            </Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Dashboard);
