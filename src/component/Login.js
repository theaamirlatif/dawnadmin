import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [buttonText, setButtonText] = useState("LOG IN")
    const [errorText, setErrorText] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
        if (window.sessionStorage.getItem("id")) {
            navigate("/")
        }
    }, [])

    async function LogIn() {
        setButtonText("LogingIn..")
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        let result = await fetch(window.api + "adminLogIn", {
            method: 'POST',
            body: formData
        });
        result = await result.json()
        if (result.errorEmail) {
            setError(true)
            setErrorText("Email does not exist")
            setButtonText("LOG IN")
        } else if (result.errorPassword) {
            setError(true)
            setErrorText("Password does not match")
            setButtonText("LOG IN")
        } else {
            setError(false)
            window.sessionStorage.setItem("id", result.id)
            setButtonText("LOG IN")
            navigate('/')
        }
    }


    return (
        <>
            <div className='hold-transition login-page'>
                <div class="login-box">
                    <div class="login-logo">
                        <a href="#"><b>Admin</b>LTE</a>
                    </div>
                    <div class="card">
                        <div class="card-body login-card-body">
                            <p class="login-box-msg">Sign in to start your session</p>
                            {error ?
                                <div className="alert alert-danger alert-dismissible">
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button> */}
                                    {errorText}
                                </div> :
                                <></>
                            }

                            <div class="input-group mb-3">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" placeholder="Email" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" placeholder="Password" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8">

                                </div>
                                <div class="col-4">
                                    <button type="button" onClick={LogIn} class="btn btn-primary btn-block">{buttonText}</button>
                                </div>
                            </div>

                            <div class="social-auth-links text-center mb-3">
                                <p>- OR -</p>

                            </div>
                            <p class="mb-1">
                                If you have forgot your password contact micrologicx
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
