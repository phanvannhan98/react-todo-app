import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { SemipolarLoading } from 'react-loadingg';
import axios from 'axios'
import CallAPI from '../../utils/apiCaller';
import './main.scss'
import './util.scss'

export default () => {
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRedirect, setIsRedirect] = useState('')

    useEffect(() => {
        CallAPI('/api/login/checktoken', 'POST').then(doc => {
            setIsRedirect(doc.data ? doc.data : '')
        })
        return () => {
            setLoad(false)
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        setLoad(true)
        if (email && password)
            axios.post('/api/login/', { email, password })
                .then(doc => {
                    if (doc.data) {
                        document.cookie = `authorization=${doc.data}; path=/`;
                    }
                    setLoad(false)
                    setIsRedirect(doc.data)
                })
        else
            setLoad(false) 
    }

    if (isRedirect)
        return <Redirect to='/' />

    return (
        <>
        {load ? <><div style={{ background: 'rgb(195, 66, 191)', opacity: 0.3, position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}></div><SemipolarLoading color="red" speed="1" size="large" /></> : null}
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={onSubmit}>
                        <span className="login100-form-title p-b-26">
                            Welcome
                        </span>
                        <span className="login100-form-title p-b-48">
                            <i className="zmdi zmdi-font" />
                        </span>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input
                                className={email.length ? 'input100 has-val' : 'input100'}
                                type="text"
                                name="email"
                                value={email}
                                required
                                onChange={(e) => { setEmail(e.currentTarget.value); setIsRedirect('') }}
                            />
                            <span className="focus-input100" data-placeholder="Email" />
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <span className="btn-show-pass">
                                <i className="zmdi zmdi-eye" />
                            </span>
                            <input
                                className={password.length ? 'input100 has-val' : 'input100'}
                                type="password"
                                name="password"
                                value={password}
                                required
                                onChange={(e) => { setPassword(e.currentTarget.value); setIsRedirect('') }}
                            />
                            <span className="focus-input100" data-placeholder="Password" />
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                {

                                }
                                <div className="login100-form-bgbtn"/>
                                <button className="login100-form-btn">
                                    Login
                        </button>
                            </div>
                        </div>
                        <p style={{ ...{ marginTop: '25px', color: 'red', textAlign: 'center', cursor: 'default' }, opacity: `${isRedirect === false ? 1 : 0}` }}>
                            Login failed <br />username or password is incorrect.
                        </p>
                        <div className="text-center p-t-55">
                            <span className="txt1">
                                Don’t have an account?
                            </span>
                            <a className="txt2" href="/">
                                Sign Up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
