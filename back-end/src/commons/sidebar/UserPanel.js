import React, { Component } from 'react'
import man from '../../assets/images/dashboard/man.png'

export class UserPanel extends Component {
    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={man} alt="#" />
                    </div>
                    <h6 className="mt-3 f-14">Admin</h6>
                    <p>Administrators.</p>
                </div>
            </div>
        )
    }
}

export default UserPanel

