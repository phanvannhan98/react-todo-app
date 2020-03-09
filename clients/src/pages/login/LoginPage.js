import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { SemipolarLoading } from 'react-loadingg';
import axios from 'axios'
import CallAPI from '../../utils/apiCaller';
import { Link } from 'react-router-dom'
import './main.scss'


export default () => {
    const [load, setLoad] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isRedirect, setIsRedirect] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)


    useEffect(() => {
        CallAPI('/api/login/checktoken', 'POST').then(doc => {
            setIsRedirect(doc && doc.data ? doc.data : '')
        })
        return () => {
            setLoad(false)
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        setLoad(true)
        if (username && password)
            axios.post('/api/login/', { username, password })
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
            <div className="wrapper-login">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form" onSubmit={onSubmit}>
                            <span className="login100-form-title">
                                Welcome
                            </span>
                            <div className="wrap-input100 validate-input">
                                <input
                                    className={username.length ? 'input100 has-val' : 'input100'}
                                    type="text"
                                    name="username"
                                    value={username}
                                    required
                                    onChange={(e) => { setUsername(e.currentTarget.value); setIsRedirect('') }}
                                />
                                <span className="focus-input100" data-placeholder="Username" />
                            </div>
                            <div className="wrap-input100">
                                <span className="btn-show-pass" onClick={() => { setIsShowPass(!isShowPass) }}>
                                    {!isShowPass ? <img src="./images/look.svg" alt="x" /> : <img src="./images/eye.svg" alt="x" />}
                                </span>
                                <input
                                    className={password.length ? 'input100 has-val' : 'input100'}
                                    type={!isShowPass ? "password" : 'text'}
                                    name="password"
                                    value={password}
                                    required
                                    onChange={(e) => { setPassword(e.currentTarget.value); setIsRedirect('') }}
                                />
                                <span className="focus-input100" data-placeholder="Password" />
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn" />
                                    <button className="login100-form-btn">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <p style={{ ...{ marginTop: '25px', color: 'red', textAlign: 'center', cursor: 'default' }, opacity: `${isRedirect === false ? 1 : 0}` }}>
                                Login failed <br />username or password is incorrect.
                            </p>
                            <div className="login100-form-footer">
                                <span className="txt1">
                                    Don’t have an account?
                                </span>
                                <Link className="txt2" to="/register">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
