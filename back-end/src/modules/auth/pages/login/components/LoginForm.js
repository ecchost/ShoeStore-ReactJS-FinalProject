import React from 'react'
import {Link} from 'react-router-dom'


const LoginForm = ({email, password, errors, handleChange, handleLogin}) => {
    return(
        <form className="form-horizontal auth-form" onSubmit={handleLogin} noValidate>
            <div className="form-group">
                <input type="text"
                       className={`form-control ${errors.has('email') && 'is-invalid'}`}
                       name="email"
                       id="email"
                       placeholder="Email address"
                       value={email || ''}
                       onChange={e => handleChange(e.target.name, e.target.value)}
                       required
                       autoFocus/>
                {errors.has('email') &&
                <div className="invalid-feedback">{errors.first('email')}</div>}
            </div>
            <div className="form-group">
                <input type="password"
                       className={`form-control ${errors.has('password') && 'is-invalid'}`}
                       id="password"
                       name="password"
                       placeholder="Password"
                       value={password || ''}
                       onChange={e => handleChange(e.target.name, e.target.value)}
                       required/>
                {errors.has('password') &&
                <div className="invalid-feedback">{errors.first('password')}</div>}
            </div>
            <div className="form-terms">
                <div className="custom-control custom-checkbox mr-sm-2">
                    <input type="checkbox" className="custom-control-input"
                           id="customControlAutosizing"/>
                    <label className="d-block">
                        <input className="checkbox_animated" name="remember" type="checkbox"
                        /> Reminder Me
                    </label>
                </div>
            </div>
            <div className="form-button">
                <button className="btn btn-primary" type="submit"
                        disabled={errors.any()}>Login
                </button>
            </div>
        </form>
    )
}

export default LoginForm;