import React from 'react'
import {Link} from "react-feather";

const RegisterForm = ({email, password, errors, handleChange, handleRegister}) => {
    return(
        <form className="form-horizontal auth-form" onSubmit={handleRegister} noValidate>
            <div className="form-group">
                <input type="text"
                       className={`form-control ${errors.has('name') && 'is-invalid'}`}
                       name="name"
                       id="name"
                       placeholder="Full Name"
                       onChange={e => handleChange(e.target.name, e.target.value)}
                       required
                       autoFocus/>
                {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
            </div>
            <div className="form-group">
                <input type="email"
                       className={`form-control  ${errors.has('email') && 'is-invalid'}`}
                       name="email"
                       id="email"
                       placeholder="Email address"
                       value={email || ''}
                       onChange={e => handleChange(e.target.name, e.target.value)}
                       required
                       autoFocus/>
                {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
            </div>
            <div className="form-group">
                <input type="password"
                       className={`form-control  ${errors.has('password') && 'is-invalid'}`}
                       id="password"
                       name="password"
                       placeholder="Password"
                       value={password || ''}
                       onChange={e => handleChange(e.target.name, e.target.value)}
                       required/>
                {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
            </div>
            <div className="form-group">
                <input type="password"
                       className={`form-control  ${errors.has('passwordConfirmation') && 'is-invalid'}`}
                       id="passwordConfirmation"
                       name="passwordConfirmation"
                       placeholder="Confirm Password"
                       onChange={e => handleChange(e.target.name, e.target.value)}
                       required/>
                {errors.has('passwordConfirmation') &&
                <div className="invalid-feedback">{errors.first('passwordConfirmation')}</div>}
            </div>
            <div className="form-terms">
                <div className="custom-control custom-checkbox mr-sm-2">
                    <input type="checkbox" className="custom-control-input"
                           id="customControlAutosizing"/>
                    <label className="d-block">
                        <input className="checkbox_animated" id="chk-ani2" type="checkbox"/>
                        I agree all statements in <span><Link to="#">Terms &amp; Conditions</Link></span>
                    </label>
                </div>
            </div>
            <div className="form-button">
                <button className="btn btn-primary" type="submit"
                        disabled={errors.any()}>Register
                </button>
            </div>
            <div className="form-footer">
                <span>Or Sign up with social platforms</span>
                <ul className="social">
                    <li><Link className="fa fa-facebook" to="#"/></li>
                    <li><Link className="fa fa-twitter" to="#"/></li>
                    <li><Link className="fa fa-instagram" to="#"/></li>
                    <li><Link className="fa fa-pinterest" to="#"/></li>
                </ul>
            </div>
        </form>
    )
}

export default RegisterForm;
