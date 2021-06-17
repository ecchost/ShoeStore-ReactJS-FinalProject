import React, {Component, Fragment} from 'react';
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs';
import {User, Unlock} from 'react-feather';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../../actions/login";

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            email: "",
            password: "",
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleEmailChange = ({target}) => {
        this.setState({email: target.value})
    }
    handlePasswordChange = ({target}) => {
        this.setState({password: target.value})
    }

    handleSubmit = () => {
        const {dispatch} = this.props;
        const {email, password} = this.state;
        dispatch(login(email, password));
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    routeChange = () => {
        this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
    }

    render() {
        const {loginError, isAuthenticated} = this.props;

        if (isAuthenticated) {
            return <Redirect to="/"/>;
        } else {
            return (
                <div>
                    <Fragment>
                        <Tabs>
                            <TabList className="nav nav-tabs tab-coupon">
                                <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User/>Login</Tab>
                                <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock/>Register</Tab>
                            </TabList>

                            <TabPanel>
                                <form className="form-horizontal auth-form">
                                    <div className="form-group">
                                        <input required="" name="login[username]" type="email" className="form-control"
                                               placeholder="Username" id="exampleInputEmail1"/>
                                    </div>
                                    <div className="form-group">
                                        <input required="" name="login[password]" type="password"
                                               className="form-control"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-terms">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="customControlAutosizing"/>
                                            <label className="d-block">
                                                <input className="checkbox_animated" id="chk-ani2" type="checkbox"/>
                                                Reminder Me <span className="pull-right"> <a href="#"
                                                                                             className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit"
                                                onClick={() => this.handleSubmit()}>Login
                                        </button>
                                    </div>
                                    <div className="form-footer">
                                        <span>Or Login up with social platforms</span>
                                        <ul className="social">
                                            <li><a className="fa fa-facebook" href=""/></li>
                                            <li><a className="fa fa-twitter" href=""/></li>
                                            <li><a className="fa fa-instagram" href=""/></li>
                                            <li><a className="fa fa-pinterest" href=""/></li>
                                        </ul>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel>
                                <form className="form-horizontal auth-form">
                                    <div className="form-group">
                                        <input required="" name="login[username]" type="email" className="form-control"
                                               placeholder="Username" id="exampleInputEmail12"/>
                                    </div>
                                    <div className="form-group">
                                        <input required="" name="login[password]" type="password"
                                               className="form-control"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <input required="" name="login[password]" type="password"
                                               className="form-control"
                                               placeholder="Confirm Password"/>
                                    </div>
                                    <div className="form-terms">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="customControlAutosizing"/>
                                            <label className="d-block">
                                                <input className="checkbox_animated" id="chk-ani2" type="checkbox"/>
                                                I agree all statements in <span><a
                                                href="">Terms &amp; Conditions</a></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit"
                                                onClick={() => this.routeChange()}>Register
                                        </button>
                                    </div>
                                    <div className="form-footer">
                                        <span>Or Sign up with social platforms</span>
                                        <ul className="social">
                                            <li><a className="fa fa-facebook" href=""/></li>
                                            <li><a className="fa fa-twitter" href=""/></li>
                                            <li><a className="fa fa-instagram" href=""/></li>
                                            <li><a className="fa fa-pinterest" href=""/></li>
                                        </ul>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </Fragment>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(LoginTabset);

