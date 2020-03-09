import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { SemipolarLoading } from 'react-loadingg';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default () => {
    const [load, setLoad] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [isRedirect, setIsRedirect] = useState('')

    const [errorL, setErrorL] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        setLoad(true)
        if (username && password && repassword){
            if(username.length < 7 || username.length > 20){
                username.length < 7 ? setErrorL('Register failed Username is too short!') : setErrorL('Register failed Username is too long!')
                setLoad(false)
            }
            else if(password === repassword){
                axios.post('/api/login/register', { username, password })
                .then(doc => {
                    if (doc.data) {
                        setIsRedirect(true)
                    }else{
                        setErrorL('Register failed \n Username is exist')
                    }
                    setLoad(false)
                })
            }else{
                setLoad(false)
                setErrorL("Register failed \n Password doesn't match ")
            }
        }
        else
            setLoad(false)
    }

    if (isRedirect)
        return <Redirect to='/login' />
    
    return (
        <>
            {load ? <><div style={{ background: 'rgb(195, 66, 191)', opacity: 0.3, position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}></div><SemipolarLoading color="red" speed="1" size="large" /></> : null}
            <div className="wrapper-login">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form" onSubmit={onSubmit}>
                            <span className="login100-form-title">
                                Register
                            </span>

                            <div className="wrap-input100">
                                <input
                                    className={username.length ? 'input100 has-val' : 'input100'}
                                    type="text"
                                    name="text"
                                    value={username}
                                    required
                                    onChange={(e) => { setUsername(e.currentTarget.value); setIsRedirect(''); setErrorL('') }}
                                />
                                <span className="focus-input100" data-placeholder="Username" />
                            </div>
                            <div className="wrap-input100">
                                <span className="btn-show-pass">
                                    <i className="zmdi zmdi-eye" />
                                </span>
                                <input
                                    className={password.length ? 'input100 has-val' : 'input100'}
                                    type="password"
                                    name="password"
                                    value={password}
                                    required
                                    onChange={(e) => { setPassword(e.currentTarget.value); setIsRedirect(''); setErrorL('') }}
                                />
                                <span className="focus-input100" data-placeholder="Password" />
                            </div>
                            <div className="wrap-input100 validate-input">
                                <span className="btn-show-pass">
                                    <i className="zmdi zmdi-eye" />
                                </span>
                                <input
                                    className={repassword.length ? 'input100 has-val' : 'input100'}
                                    type="password"
                                    name="password"
                                    value={repassword}
                                    required
                                    onChange={(e) => { setRepassword(e.currentTarget.value); setIsRedirect(''); setErrorL('') }}
                                />
                                <span className="focus-input100" data-placeholder="Re-Password" />
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn" />
                                    <button className="login100-form-btn">
                                        Register
                                    </button>
                                </div>
                            </div>
                            <p style={{ ...{ marginTop: '25px', color: 'red', textAlign: 'center', cursor: 'default' }, opacity: `${errorL ? 1 : 0}` }}>
                                {errorL}
                            </p>
                            <div className="login100-form-footer">
                                <span className="txt1">
                                    Do have an account?
                            </span>
                                <Link className="txt2" to="/login">
                                    Login
                            </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
