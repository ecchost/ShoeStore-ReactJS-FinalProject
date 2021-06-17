import React, {Component, Fragment} from 'react'
import {Validator} from 'ree-validate'
import {Redirect} from 'react-router-dom'
import stats from "../../../../assets/images/dashboard/stats.png";
import Slider from "react-slick";
import TabSetter from "./components/TabSetter"
import {login} from "../../store/actions";


class Container extends Component {
    constructor(props) {
        super(props)

        this.validator = new Validator({
            email: 'required|email',
            password: 'required|min:6'
        })

        this.state = {
            credentials: {
                email: '',
                password: '',
            },
            errors: this.validator.errors
        }
    }

    handleChange = (name, value) => {
        const {errors} = this.validator

        this.setState({credentials: {...this.state.credentials, [name]: value}})

        errors.remove(name)

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors})
            })
    }

    handleLogin = e => {
        e.preventDefault()
        const {credentials} = this.state
        const {errors} = this.validator

        this.validator.validateAll(credentials)
            .then((success) => {
                if (success) {
                    const { dispatch } = this.props;
                    const { email, password } = this.state.credentials;
                    dispatch(login(email, password));
                } else {
                    this.setState({errors})
                }
            })
    }

    handleRegister = e => {
        e.preventDefault()
        const {credentials} = this.state
        const {errors} = this.validator

        this.validator.validateAll(credentials)
            .then((success) => {
                if (success) {
                    // register
                } else {
                    this.setState({errors})
                }
            })
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard"/>
        }

        let loginResolver = {
            email: this.state.credentials.email,
            password: this.state.credentials.password,
            errors: this.state.errors,
            handleChange: this.handleChange,
            handleLogin: this.handleLogin
        }

        let registerResolver = {
            email: this.state.credentials.email,
            password: this.state.credentials.password,
            errors: this.state.errors,
            handleChange: this.handleChange,
            handleLogin: this.handleRegister,
        }

        const props = {
            loginResolver: loginResolver,
            registerResolver: registerResolver,
            clickActive: this.clickActive
        }

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: false
        };

        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 p-0 card-left">
                                    <div className="card bg-primary">
                                        <div className="svg-icon">
                                            <img src={stats} className="Img-fluid"  alt="img"/>
                                        </div>
                                        <Slider className="single-item" {...settings}>
                                            <div>
                                                <div>
                                                    <h3>Welcome to Magiczola</h3>
                                                    <p>Magiczola admin panel</p>
                                                </div>
                                            </div>
                                        </Slider >
                                    </div>
                                </div>
                                <div className="col-md-7 p-0 card-right">
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <TabSetter {...props}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Container
