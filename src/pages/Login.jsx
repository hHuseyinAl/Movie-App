import React, { useState } from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Notification from '../components/Notifications'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { logIn } = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await logIn(email, password)
            navigate("/")
            if (location.pathname === "/") {
                setTimeout(() => {
                    toast.success("Successfully Logged In")
                }, 100);
            }
        } catch (error) {
            console.log(error)
            toast.error("Invalid Email Or Password")
            setEmail("")
            setPassword("")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login'>
            <div className='login_border'>
                <h1>Login</h1>
                <form className="formlog" onSubmit={handleSubmit}>
                    <span className="input-span">
                        <label htmlFor='email'>Email</label>
                        <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></span>
                    <span className="input-span">
                        <label htmlFor='password'>Password</label>
                        <input required type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /></span>
                    <button className="enter" disabled={loading} >{loading ? "Loading" : "Sign In"}</button>
                    <span className="span">New to MovieWeb? <Link to='/signup'>Sign Up</Link></span>
                </form>
            </div>
            <Notification />
        </div>
    )
}

export default Login