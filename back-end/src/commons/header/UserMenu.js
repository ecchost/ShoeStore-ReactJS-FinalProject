import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'

import man from '../../assets/images/dashboard/man.png'
import {logout} from "../../modules/auth/store/actions";
import {connect} from "react-redux";

export class UserMenu extends Component {
    handleLogout = () => {
        const {dispatch} = this.props;
        dispatch(logout())
    }
    render() {
        const {isLoggingOut, logoutError} = this.props;
        return (
            <Fragment>
                    <li className="onhover-dropdown">
                        <div className="media align-items-center">
                            <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                            <div className="dotted-animation"><span className="animate-circle"/><span className="main-circle"/></div>
                        </div>
                        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                            <li><Link to="#" onClick={this.handleLogout}><i data-feather="log-out"/>Logout</Link>
                                {isLoggingOut && <p>Logging out...</p>}
                                {logoutError && <p>Error logging out...</p>} 
                            </li>
                        </ul>
                    </li>
            </Fragment>
        )
    }
}
function mapStateToProps(state){
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    }
}
export default connect(mapStateToProps)(UserMenu)
